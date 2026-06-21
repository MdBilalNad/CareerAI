from app.services.gemini_service import get_ai_response
from app.utils.prompts import ROADMAP_PROMPT, SKILL_GAP_PROMPT

def generate_roadmap(career: str, current_skills: str, experience_level: str) -> str:
    """Generate personalized learning roadmap"""
    prompt = ROADMAP_PROMPT.format(
        career=career,
        skills=current_skills if current_skills else "None specified",
        level=experience_level
    )
    return get_ai_response(prompt, max_tokens=3000)

def analyze_skill_gap(career: str, current_skills: str) -> str:
    """Analyze skill gaps for a career"""
    prompt = SKILL_GAP_PROMPT.format(career=career, skills=current_skills)
    return get_ai_response(prompt)

def get_career_suggestions(skills: str) -> str:
    """Suggest careers based on skills"""
    prompt = f"""Based on these skills: {skills}

    Suggest 5 career paths with:
    1. Job title
    2. Why it's a good fit
    3. Additional skills needed
    4. Average salary range (India)
    5. Growth potential"""
    return get_ai_response(prompt)