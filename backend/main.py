from fastapi import FastAPI

app = FastAPI(
    title="Smart Document AI Agent",
    version="1.0.0"
)

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is running"
    }
