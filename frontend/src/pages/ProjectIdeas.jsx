import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import FormattedResult from '../components/FormattedResult';
import { FiCode } from 'react-icons/fi';
import { HiLightBulb } from 'react-icons/hi';

function ProjectIdeas() {
  const [skills, setSkills] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const { data, loading, execute } = useApi(api.suggestProjects);

  return (
    <div>
      <div className="page-header">
        <h1><div className="header-icon"><HiLightBulb /></div>Project Ideas</h1>
        <p>Discover portfolio-worthy projects tailored to your skills and goals.</p>
      </div>
      <div className="form-container">
        <form onSubmit={(e)=>{e.preventDefault();execute(skills,difficulty);}}>
          <div className="form-group"><label><FiCode /> Your Skills</label><textarea value={skills} onChange={e=>setSkills(e.target.value)} placeholder="React, Node.js, MongoDB, Python..." rows="3" required /></div>
          <div className="form-group"><label>Difficulty</label><select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
          <button className="submit-btn" disabled={loading || !skills}>Suggest Projects</button>
        </form>
      </div>
      {loading && <div className="loading-container"><div className="loading-spinner" /><p className="loading-text">Finding the best projects for you...</p></div>}
      {data && <FormattedResult content={data.projects} title="Project Recommendations" />}
    </div>
  );
}

export default ProjectIdeas;