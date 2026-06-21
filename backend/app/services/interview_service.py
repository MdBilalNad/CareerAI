from app.services.gemini_service import get_ai_response
from app.utils.prompts import INTERVIEW_QUESTIONS_PROMPT, EVALUATION_PROMPT

def generate_interview_questions(role: str, difficulty: str, topic: str = "") -> str:
    """Generate interview questions for a specific role"""
    focus = f"Focus on: {topic}" if topic else ""
    prompt = INTERVIEW_QUESTIONS_PROMPT.format(
        role=role,
        difficulty=difficulty,
        focus=focus
    )
    return get_ai_response(prompt, max_tokens=2500)

def evaluate_answer(question: str, answer: str, role: str) -> str:
    """Evaluate interview answer"""
    prompt = EVALUATION_PROMPT.format(
        role=role,
        question=question,
        answer=answer
    )
    return get_ai_response(prompt)

def get_interview_tips(role: str) -> str:
    """Get role-specific interview tips"""
    prompt = f"""Provide interview preparation tips for {role} position:
    1. Common topics to prepare
    2. Technical concepts to review
    3. Behavioral questions to expect
    4. Questions to ask the interviewer
    5. Body language tips
    6. Common mistakes to avoid"""
    return get_ai_response(prompt)

def generate_mock_interview(role: str, rounds: int = 3) -> str:
    """Generate a full mock interview script"""
    prompt = f"""Create a {rounds}-round mock interview for {role} position.

    For each round provide:
    - 3 questions
    - Expected answers
    - Scoring criteria
    
    Make it progressively harder."""
    return get_ai_response(prompt, max_tokens=3000)