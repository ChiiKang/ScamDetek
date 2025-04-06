from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List, Any
import email_analyzer  # Your existing Python file

app = FastAPI()

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    content: str
    content_type: str  # "email", "sms", "url"
    sender: Optional[str] = None

@app.post("/api/analyze")
async def analyze_content(request: AnalysisRequest):
    """Analyze content for potential scams based on content type"""

    if not request.content or not request.content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty")
    
    if request.content_type == "email":
        result = email_analyzer.analyze_email(request.content, sender=request.sender)
    elif request.content_type == "sms":
        result = email_analyzer.analyze_sms(request.content, sender=request.sender)
    elif request.content_type == "url":
        result = email_analyzer.analyze_url(request.content)
    else:
        raise HTTPException(status_code=400, detail="Invalid content type")
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)