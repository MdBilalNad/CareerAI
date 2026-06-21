from fastapi import APIRouter
from pydantic import BaseModel
from app.services.project_service import suggest_projects, get_project_details, get_learning_resources

router = APIRouter()

class ProjectSuggestRequest(BaseModel):
    skills: str
    difficulty: str = "intermediate"

class ProjectDetailRequest(BaseModel):
    project_name: str
    skills: str

class LearningResourceRequest(BaseModel):
    topic: str

@router.post("/suggest")
async def suggest_project_ideas(request: ProjectSuggestRequest):
    """Get project suggestions"""
    projects = suggest_projects(request.skills, request.difficulty)
    return {"projects": projects}

@router.post("/details")
async def project_details(request: ProjectDetailRequest):
    """Get detailed project implementation guide"""
    details = get_project_details(request.project_name, request.skills)
    return {"details": details}

@router.post("/resources")
async def learning_resources(request: LearningResourceRequest):
    """Get learning resources for a topic"""
    resources = get_learning_resources(request.topic)
    return {"resources": resources}