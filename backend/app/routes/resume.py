from fastapi import APIRouter, UploadFile, File, Form
from app.services.resume_service import analyze_resume
from app.utils.pdf_parser import parse_resume

router = APIRouter()

@router.post("/analyze")
async def analyze_resume_endpoint(
    file: UploadFile = File(None),
    text: str = Form(None)
):
    """Analyze resume from file upload or text"""
    if file:
        content = await file.read()
        resume_text = parse_resume(content, file.filename)
    elif text:
        resume_text = text
    else:
        return {"error": "Please provide a file or text"}
    
    analysis = analyze_resume(resume_text)
    return {"analysis": analysis}

@router.get("/test")
async def test_resume_analysis():
    """Test endpoint for resume analysis"""
    sample = "Python, Machine Learning, FastAPI, React, SQL, Git"
    analysis = analyze_resume(sample)
    return {"result": analysis}