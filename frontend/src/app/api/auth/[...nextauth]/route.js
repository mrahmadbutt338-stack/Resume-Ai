import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" } // Only used during registration
      },
      async authorize(credentials) {
        await connectToDatabase();

        const { email, password, name, isRegistering } = credentials;

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        // If registering
        if (isRegistering === 'true') {
          const userExists = await User.findOne({ email });
          if (userExists) {
            throw new Error("Email already exists");
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            name: name || email.split('@')[0],
            email,
            password: hashedPassword
          });
          
          return { id: newUser._id.toString(), email: newUser.email, name: newUser.name };
        }

        // If Logging in
        const user = await User.findOne({ email });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60, // 365 days (persistent login)
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Expose the MongoDB Object ID to the frontend session
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // We'll create this page later
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
