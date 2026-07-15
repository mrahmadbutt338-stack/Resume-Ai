# AI Resume Builder

An AI-powered resume builder platform built with Next.js, Express.js, MongoDB, and OpenAI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally (or an Atlas connection string)
- (Optional) OpenAI API key for AI features

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (one is already provided with defaults):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-builder
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install   # (already done if scaffolded)
```

Start the frontend:
```bash
npm run dev
```

### 3. Open the App

Visit **http://localhost:3000** in your browser.

## 📂 Project Structure

```
├── frontend/          # Next.js React application
│   ├── src/app/       # App Router pages
│   ├── src/components # Reusable UI components
│   ├── src/templates  # 5 resume template renderers
│   ├── src/styles     # CSS modules
│   └── src/utils      # API client utility
│
├── backend/           # Express.js API server
│   ├── config/        # MongoDB connection
│   ├── controllers/   # Route handlers
│   ├── middleware/     # Error handling
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   └── utils/         # OpenAI + PDF templates
```

## 🎨 Features

- **Two Creation Modes**: Structured form OR AI prompt
- **5 Resume Templates**: Modern, Minimal, Creative, Corporate, Elegant
- **AI Integration**: OpenAI-powered content generation & enhancement
- **Live Preview**: Real-time resume preview with inline editing
- **PDF Export**: High-quality PDF download via Puppeteer
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resumes/templates` | List available templates |
| POST | `/api/resumes` | Save resume data |
| GET | `/api/resumes/:id` | Get resume by ID |
| PUT | `/api/resumes/:id` | Update resume |
| POST | `/api/ai/generate-from-prompt` | Generate resume from text |
| POST | `/api/ai/enhance` | Enhance resume content |
| POST | `/api/pdf/generate` | Generate PDF |

## ⚠️ Notes

- Without an OpenAI API key, the app uses mock/sample data for AI features
- Puppeteer requires downloading a Chromium binary (~280MB) on first `npm install`
- Make sure MongoDB is running before starting the backend
