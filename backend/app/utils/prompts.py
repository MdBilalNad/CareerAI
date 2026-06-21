# Resume Analysis Prompts
RESUME_ANALYSIS_PROMPT = """Analyze this resume and provide detailed feedback:

Resume:
{resume_text}

Please provide:
1. **Overall Impression** (Score out of 10)
2. **Key Strengths** (Top 3-5)
3. **Areas for Improvement** (With specific suggestions)
4. **ATS Compatibility Score** (Out of 10 with reasons)
5. **Suggested Job Roles** (3-5 roles)
6. **Missing Keywords** (Important for ATS)
7. **Format Recommendations**

Be specific and actionable."""

# Roadmap Generation Prompts
ROADMAP_PROMPT = """Create a comprehensive learning roadmap for {career}.

Current Skills: {skills}
Experience Level: {level}

Provide a detailed roadmap with:
1. **Timeline** (6-12 months, broken down monthly)
2. **Monthly Goals** (Specific, measurable objectives)
3. **Skills to Learn** (Ordered by priority with difficulty level)
4. **Resources** (Free & paid courses, books, tutorials)
5. **Projects** (One major project per quarter)
6. **Milestones** (Key achievements to track progress)
7. **Time Commitment** (Hours per week recommended)
8. **Prerequisites** (What to learn before starting)

Use emojis and clear formatting. Make it motivating!"""

# Interview Questions Prompts
INTERVIEW_QUESTIONS_PROMPT = """Generate interview questions for {role} position.
Difficulty: {difficulty}
{focus}

Provide EXACTLY 10 questions with:
1. The question
2. What interviewer is looking for
3. Key points to mention
4. Red flags to avoid

Include mix of:
- Technical questions (4)
- Behavioral questions (3)
- Problem-solving (2)
- Role-specific (1)

Format each question clearly with Q1, Q2, etc."""

# Interview Evaluation Prompt
EVALUATION_PROMPT = """Evaluate this interview answer:

Role: {role}
Question: {question}
Answer: {answer}

Provide:
1. **Score** (Out of 10)
2. **What was good** (2-3 points)
3. **What to improve** (2-3 points with examples)
4. **Model Answer** (A better response)
5. **Key Takeaways** (For similar questions)

Be constructive and encouraging."""

# Project Suggestions Prompt
PROJECT_SUGGESTIONS_PROMPT = """Suggest 5 {difficulty}-level projects for skills: {skills}

For each project provide:
1. **Project Name**
2. **Description** (2-3 sentences)
3. **Key Features** (4-5 bullet points)
4. **Tech Stack** (Specific technologies)
5. **Learning Outcomes** (What you'll learn)
6. **Time Estimate** (Hours to complete)
7. **Difficulty Level**
8. **Portfolio Value** (High/Medium/Low)
9. **Real-world Application**

Include beginner to advanced progression."""

# Skill Gap Analysis
SKILL_GAP_PROMPT = """Analyze skill gaps for {career}:

Current Skills: {skills}

Provide:
1. **Missing Critical Skills** (Top 5)
2. **Industry Requirements** (What employers want)
3. **Learning Priority** (Order of importance)
4. **Time to Learn Each** (Estimated weeks)
5. **Resource Recommendations**
6. **Alternative Career Paths** (Based on current skills)"""