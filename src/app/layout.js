import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';
import AuthProvider from '@/components/AuthProvider';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RESUME AI - Professional CVs in Minutes',
  description: 'Create your perfect professional CV with RESUME AI. Fast, easy, and free.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <ClientWrapper>
              {children}
            </ClientWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
