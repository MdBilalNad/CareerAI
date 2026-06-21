from app.services.gemini_service import get_ai_response
from app.utils.prompts import PROJECT_SUGGESTIONS_PROMPT

def suggest_projects(skills: str, difficulty: str) -> str:
    """Suggest projects based on skills and difficulty"""
    prompt = PROJECT_SUGGESTIONS_PROMPT.format(
        skills=skills,
        difficulty=difficulty
    )
    return get_ai_response(prompt, max_tokens=3000)

def get_project_details(project_name: str, skills: str) -> str:
    """Get detailed implementation guide for a project"""
    prompt = f"""Create a detailed implementation guide for '{project_name}' using: {skills}

    Include:
    1. Architecture overview
    2. Step-by-step implementation
    3. Code structure
    4. Database design (if applicable)
    5. API endpoints (if applicable)
    6. Deployment steps
    7. Testing approach
    8. Potential challenges and solutions"""
    return get_ai_response(prompt, max_tokens=3000)

def get_learning_resources(topic: str) -> str:
    """Get learning resources for a topic"""
    prompt = f"""Suggest best learning resources for {topic}:
    1. Free courses (with links if possible)
    2. Paid courses
    3. YouTube channels
    4. Books
    5. Practice platforms
    6. Communities/forums
    7. GitHub repositories"""
    return get_ai_response(prompt)