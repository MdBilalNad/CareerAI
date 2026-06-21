from fastapi import APIRouter
from pydantic import BaseModel
from app.services.roadmap_service import generate_roadmap, analyze_skill_gap, get_career_suggestions

router = APIRouter()

class RoadmapRequest(BaseModel):
    career: str
    current_skills: str = ""
    experience_level: str = "beginner"

class SkillGapRequest(BaseModel):
    career: str
    current_skills: str

class CareerSuggestRequest(BaseModel):
    skills: str

@router.post("/generate")
async def create_roadmap(request: RoadmapRequest):
    """Generate personalized learning roadmap"""
    roadmap = generate_roadmap(
        request.career,
        request.current_skills,
        request.experience_level
    )
    return {"roadmap": roadmap}

@router.post("/skill-gap")
async def check_skill_gap(request: SkillGapRequest):
    """Analyze skill gaps"""
    analysis = analyze_skill_gap(request.career, request.current_skills)
    return {"analysis": analysis}

@router.post("/career-suggestions")
async def suggest_careers(request: CareerSuggestRequest):
    """Get career suggestions based on skills"""
    suggestions = get_career_suggestions(request.skills)
    return {"suggestions": suggestions}