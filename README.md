# Smart Document AI Agent

A full-stack **Generative AI document analysis application** built using **Pydantic AI**, **FastAPI**, and **Next.js**.

The application allows users to upload a PDF document and ask natural language questions about its content.  
A Pydantic AI–based agent analyzes the document and returns **structured, validated answers** with a confidence score.

This project is designed as a **real-world AI agent system**, focusing on backend robustness, clean APIs, and polished UX.

---

## 🚀 Live Application

### Frontend (Vercel)
https://smart-doc-ai-agent.vercel.app

### Backend (Render)
https://smart-doc-ai-agent.onrender.com

Swagger API Docs:
https://smart-doc-ai-agent.onrender.com/docs


---

## 🎥 Project Walkthrough (Assessment Submission)

🔗 **Watch the LinkedIn Walkthrough Video**  
[Click here to watch]([https://www.linkedin.com/posts/<your-linkedin-post-id>](https://www.linkedin.com/posts/iliyas4khan_potpieai-softwareengineer-generativeai-ugcPost-7419324049664782336-j1yK?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIC0tcBL4EV25pr36eHkLHyvvd1ysIeX6M))


## 🚀 Features

- Upload PDF documents
- Ask natural language questions about the document
- AI answers strictly based on document content
- Structured responses with confidence score
- End-to-end usable full-stack application
- Clean, readable UI with micro-interactions
- Robust error handling and validation

---

## 🧠 System Architecture

Frontend (Next.js + Tailwind CSS)
|
v
FastAPI Backend
|
v
Pydantic AI Agent
|
v
OpenRouter (Free LLM)


---

## 🛠️ Tech Stack

### Backend
- Python 3.11
- FastAPI
- Pydantic
- Pydantic AI
- PyPDF2
- Uvicorn

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS

### AI / LLM
- OpenRouter (free tier)
- Model: `tngtech/tng-r1t-chimera:free`

---

## ✨ Key Highlights

### AI & Backend
- Pydantic AI agent with explicit system rules
- Strict schema validation using Pydantic models
- Defensive parsing of LLM output (handles markdown-wrapped JSON)
- Clean REST APIs with Swagger documentation
- Robust error handling, logging, and CORS configuration

### Frontend & UX
- Clear visual hierarchy and readable typography
- Highlighted title and output sections
- Explicit file selection feedback
- Smooth hover and focus interactions
- Loading and error states for better user experience

---

## 📡 API Endpoints

### Health Check
Endpoint:
GET /

Description:
Checks whether the backend service is running.

Response:
{
  "status": "ok",
  "message": "Backend is running"
}

---

### Ask Question (Text Input)
Endpoint:
POST /ask

Description:
Allows asking a question on plain text content without uploading a file.

Request Body:
{
  "document_text": "string",
  "question": "string"
}

Response:
{
  "answer": "string",
  "confidence": 0.0
}

---

### Upload PDF & Ask Question
Endpoint:
POST /upload-and-ask

Description:
Uploads a PDF document and allows asking a question based on its content.

Form Data:
- file: PDF document
- question: string

Response:
{
  "answer": "string",
  "confidence": 0.0
}


## 🔐 Environment Variables

Create a .env file inside the backend/ directory:

OPENROUTER_API_KEY=your_openrouter_api_key


⚠️ Never commit .env files.
A .env.example file is provided.

▶️ Running Locally

Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Swagger UI:
http://127.0.0.1:8000/docs

Frontend
cd frontend
npm install
npm run dev

Open in browser:
http://localhost:3000

📦 Deployment

Backend: Render

Frontend: Vercel

The application is deployed as two independent services and communicates via REST APIs.






