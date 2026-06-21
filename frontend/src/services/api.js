const API_BASE = 'https://careerai-api.onrender.com';

async function fetchWithRetry(url, options, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      return res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 10000)); // Wait 10s
    }
  }
}

export const api = {
  analyzeResume: async (formData) => {
    return fetchWithRetry(`${API_BASE}/api/resume/analyze`, {
      method: 'POST',
      body: formData,
    });
  },
  generateRoadmap: async (career, currentSkills, experienceLevel) => {
    return fetchWithRetry(`${API_BASE}/api/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ career, current_skills: currentSkills, experience_level: experienceLevel }),
    });
  },
  getInterviewQuestions: async (role, difficulty, topic) => {
    return fetchWithRetry(`${API_BASE}/api/interview/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, difficulty, topic }),
    });
  },
  evaluateAnswer: async (question, answer, role) => {
    return fetchWithRetry(`${API_BASE}/api/interview/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer, role }),
    });
  },
  suggestProjects: async (skills, difficulty) => {
    return fetchWithRetry(`${API_BASE}/api/projects/suggest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skills, difficulty }),
    });
  }
};