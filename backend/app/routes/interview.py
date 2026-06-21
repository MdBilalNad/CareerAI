from fastapi import APIRouter
from pydantic import BaseModel
from app.services.interview_service import (
    generate_interview_questions,
    evaluate_answer,
    get_interview_tips,
    generate_mock_interview
)

router = APIRouter()

class InterviewQuestionsRequest(BaseModel):
    role: str
    difficulty: str = "medium"
    topic: str = ""

class AnswerEvaluationRequest(BaseModel):
    question: str
    answer: str
    role: str

class InterviewTipsRequest(BaseModel):
    role: str

class MockInterviewRequest(BaseModel):
    role: str
    rounds: int = 3

@router.post("/questions")
async def get_questions(request: InterviewQuestionsRequest):
    """Generate interview questions"""
    questions = generate_interview_questions(
        request.role,
        request.difficulty,
        request.topic
    )
    return {"questions": questions}

@router.post("/evaluate")
async def evaluate_interview_answer(request: AnswerEvaluationRequest):
    """Evaluate interview answer"""
    evaluation = evaluate_answer(
        request.question,
        request.answer,
        request.role
    )
    return {"evaluation": evaluation}

@router.post("/tips")
async def interview_tips(request: InterviewTipsRequest):
    """Get interview tips for a role"""
    tips = get_interview_tips(request.role)
    return {"tips": tips}

@router.post("/mock-interview")
async def mock_interview(request: MockInterviewRequest):
    """Generate mock interview"""
    interview = generate_mock_interview(request.role, request.rounds)
    return {"interview": interview}