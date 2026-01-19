from pydantic import BaseModel, Field
from pydantic_ai import Agent
from dotenv import load_dotenv

load_dotenv()

class DocumentAnswer(BaseModel):
    answer: str = Field(description="Answer based on the document")
    confidence: float = Field(
        ge=0.0,
        le=1.0,
        description="Confidence score between 0 and 1"
    )

doc_agent = Agent(
    model="openrouter:tngtech/tng-r1t-chimera:free",
    system_prompt="""
You are a document analysis AI agent.

You MUST reply ONLY in valid JSON with this exact schema:

{
  "answer": string,
  "confidence": number between 0 and 1
}

Rules:
- Use ONLY the document content
- If answer is not present, say so
- Do not add extra keys
- Do not add explanations outside JSON
"""
)
