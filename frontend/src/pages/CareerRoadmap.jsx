import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import FormattedResult from '../components/FormattedResult';
import { FiMap, FiTarget, FiTrendingUp } from 'react-icons/fi';

function CareerRoadmap() {
  const [career, setCareer] = useState('');
  const [skills, setSkills] = useState('');
  const [level, setLevel] = useState('beginner');
  const { data, loading, execute } = useApi(api.generateRoadmap);

  const handleSubmit = (e) => {
    e.preventDefault();
    execute(career, skills, level);
  };

  return (
    <div>
      <div className="page-header">
        <h1><div className="header-icon"><FiMap /></div>Career Roadmap</h1>
        <p>Generate a personalized learning path to master your target career.</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FiTarget /> Target Career</label>
            <select value={career} onChange={(e) => setCareer(e.target.value)} required>
              <option value="">Select career path...</option>
              <option>Full Stack Developer</option>
              <option>Data Scientist</option>
              <option>Machine Learning Engineer</option>
              <option>DevOps Engineer</option>
              <option>UI/UX Designer</option>
              <option>Cloud Architect</option>
              <option>Mobile App Developer</option>
              <option>Cybersecurity Analyst</option>
            </select>
          </div>
          <div className="form-group">
            <label>Current Skills</label>
            <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Python, HTML, CSS, JavaScript, Git..." rows="3" />
          </div>
          <div className="form-group">
            <label><FiTrendingUp /> Experience Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <button type="submit" className="submit-btn" disabled={loading || !career}>
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </form>
      </div>
      {loading && <div className="loading-container"><div className="loading-spinner" /><p className="loading-text">Building your personalized roadmap...</p></div>}
      {data && !loading && <FormattedResult content={data.roadmap} title="Your Career Roadmap" />}
    </div>
  );
}

export default CareerRoadmap;