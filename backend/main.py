from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from PyPDF2 import PdfReader
from fastapi.middleware.cors import CORSMiddleware
from agent import doc_agent, DocumentAnswer
import traceback

app = FastAPI(
    title="Smart Document AI Agent",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Request schema (text-only)
# -------------------------
class AskRequest(BaseModel):
    document_text: str
    question: str


# -------------------------
# Health check
# -------------------------
@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running"
    }


# -------------------------
# Utility: Extract text from PDF
# -------------------------
def extract_text_from_pdf(file: UploadFile) -> str:
    reader = PdfReader(file.file)
    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text.strip()


# -------------------------
# Text-based agent endpoint
# -------------------------
@app.post("/ask")
async def ask_document(req: AskRequest):
    try:
        result = await doc_agent.run(
            f"""
Document:
{req.document_text}

Question:
{req.question}
"""
        )

        raw_output = result.output.strip()

        # Remove markdown code fences if present
        if raw_output.startswith("```"):
            raw_output = raw_output.strip("`")
            raw_output = raw_output.replace("json", "", 1).strip()

        parsed = DocumentAnswer.model_validate_json(raw_output)
        return parsed

    except Exception as e:
        print("\n========== AGENT ERROR ==========")
        traceback.print_exc()
        print("================================\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -------------------------
# PDF upload + agent endpoint
# -------------------------
@app.post("/upload-and-ask")
async def upload_and_ask(
    file: UploadFile = File(...),
    question: str = Form(...)
):
    try:
        # Validate file type
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported"
            )

        # Extract text from PDF
        document_text = extract_text_from_pdf(file)

        if not document_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF"
            )

        # Ask the agent
        result = await doc_agent.run(
            f"""
Document:
{document_text}

Question:
{question}
"""
        )

        raw_output = result.output.strip()

        # Remove markdown code fences if present
        if raw_output.startswith("```"):
            raw_output = raw_output.strip("`")
            raw_output = raw_output.replace("json", "", 1).strip()

        parsed = DocumentAnswer.model_validate_json(raw_output)
        return parsed

    except HTTPException:
        raise

    except Exception as e:
        print("\n========== PDF AGENT ERROR ==========")
        traceback.print_exc()
        print("====================================\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
