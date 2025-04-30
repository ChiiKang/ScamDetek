from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from typing import Dict, Any, Optional
import email_analyzer
import models
from database import get_db

#---------
from fastapi import UploadFile, File
import numpy as np
import cv2
import easyocr
import torch
#----------


app = FastAPI()

# Configure CORS for frontend access - make sure this is before any routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://3.107.236.104:3000","http://localhost:3000", "http://3.27.131.94:3000", "https://scamdetek.live"],  # Specifically allow your React frontend
    # allow_origins=["http://localhost:3000"],  # Specifically allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the schema directly in app.py
class AnalysisRequest(BaseModel):
    """Schema for the request to analyze content"""

    content: str
    content_type: str  # "email", "sms", "url"
    sender: Optional[str] = None


@app.post("/api/analyze")
async def analyze_content(request: AnalysisRequest, db: Session = Depends(get_db)):
    """Analyze content for spam probability and store essential information"""

    if not request.content or not request.content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty")

    # Process based on content type
    try:
        if request.content_type == "email":
            result = email_analyzer.analyze_email(
                request.content, sender=request.sender
            )
        elif request.content_type == "sms":
            result = email_analyzer.analyze_sms(request.content, sender=request.sender)
        elif request.content_type == "url":
            result = email_analyzer.analyze_url(request.content)
        else:
            raise HTTPException(status_code=400, detail="Invalid content type")
    except Exception as e:
        # Log the error for server-side debugging
        print(f"Analysis error: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Analysis failed. Please try again."
        )

    # Convert risk_percentage to spam_probability (0-1 scale)
    spam_probability = result["risk_percentage"] / 100.0

    # Determine if it's SPAM based on threshold (e.g., >0.5 is SPAM)
    label = "SPAM" if spam_probability > 0.5 else "HAM"

    # Store only the essential information in the database
    db_analysis = models.AnalysisRequest(
        content=request.content, label=label, spam_probability=spam_probability
    )

    db.add(db_analysis)
    db.commit()

    # Add the spam classification data to the result before returning
    result["label"] = label
    result["spam_probability"] = spam_probability

    # Return the full analysis result to the frontend
    return result


#------------------------------
#get image
@app.post("/api/extract-text")
async def extract_text(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        
        nparr = np.frombuffer(contents, np.uint8)
        
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise HTTPException(status_code=400, detail="Unable to decode image")
        
        reader = easyocr.Reader(['en'], gpu=torch.cuda.is_available())
        result = reader.readtext(img, detail=0)
        print("result: ",result)
        extracted_text = " ".join(result)
        return {"extracted_text": extracted_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR extraction failed: {str(e)}")


#------------------------------

@app.get("/api/test-db")
async def test_database(db: Session = Depends(get_db)):
    try:
        # Use text() to wrap the SQL query
        db.execute(text("SELECT 1"))
        return {"message": "Database connection successful!"}
    except Exception as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Database connection failed: {str(e)}"
        )

@app.get("/api/ping")
async def ping():
    return {"message": "Pong! The API is working "}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
