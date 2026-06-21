from app.services.gemini_service import get_ai_response
from app.utils.prompts import RESUME_ANALYSIS_PROMPT

def analyze_resume(resume_text: str) -> str:
    """Analyze resume text using AI"""
    prompt = RESUME_ANALYSIS_PROMPT.format(resume_text=resume_text)
    return get_ai_response(prompt)

def extract_keywords(resume_text: str) -> list:
    """Extract key skills from resume"""
    prompt = f"Extract all technical skills and keywords from this resume as a comma-separated list:\n\n{resume_text}"
    response = get_ai_response(prompt)
    return [skill.strip() for skill in response.split(',')]