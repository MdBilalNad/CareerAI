from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume import router as resume_router
from app.routes.roadmap import router as roadmap_router
from app.routes.interview import router as interview_router
from app.routes.projects import router as projects_router

app = FastAPI(title="CareerAI Platform")

# Allow all origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for now, restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router, prefix="/api/resume", tags=["Resume"])
app.include_router(roadmap_router, prefix="/api/roadmap", tags=["Roadmap"])
app.include_router(interview_router, prefix="/api/interview", tags=["Interview"])
app.include_router(projects_router, prefix="/api/projects", tags=["Projects"])

@app.get("/")
def home():
    return {"message": "CareerAI API is running", "version": "1.0"}