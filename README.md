# Smart Document AI Agent

A full-stack **Generative AI document analysis application** built using **Pydantic AI**, **FastAPI**, and **Next.js**.

The application allows users to upload a PDF document and ask natural language questions about its content.  
A Pydantic AI–based agent analyzes the document and returns **structured, validated answers** with a confidence score.

This project is designed as a **real-world AI agent system**, with strong focus on backend reliability, clean APIs, and polished UX.

---

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
- LLM output sanitization (handles markdown-wrapped JSON)
- Clean REST APIs with Swagger documentation
- Robust error handling and logging

### Frontend & UX
- Clear visual hierarchy and typography
- Highlighted title and result sections
- Explicit file selection feedback
- Smooth hover and focus interactions
- Loading and error states for better UX

