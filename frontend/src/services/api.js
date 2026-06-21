const API_BASE = 'https://careerai-api.onrender.com'; // We'll update this later

export const api = {
  analyzeResume: async (formData) => {
    const res = await fetch(`${API_BASE}/api/resume/analyze`, {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },
  generateRoadmap: async (career, currentSkills, experienceLevel) => {
    const res = await fetch(`${API_BASE}/api/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ career, current_skills: currentSkills, experience_level: experienceLevel }),
    });
    return res.json();
  },
  getInterviewQuestions: async (role, difficulty, topic) => {
    const res = await fetch(`${API_BASE}/api/interview/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, difficulty, topic }),
    });
    return res.json();
  },
  evaluateAnswer: async (question, answer, role) => {
    const res = await fetch(`${API_BASE}/api/interview/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer, role }),
    });
    return res.json();
  },
  suggestProjects: async (skills, difficulty) => {
    const res = await fetch(`${API_BASE}/api/projects/suggest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills, difficulty }),
    });
    return res.json();
  }
};