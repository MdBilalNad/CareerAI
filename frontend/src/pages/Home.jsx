import { Link } from 'react-router-dom';
import { FiFileText, FiMap, FiUserCheck, FiArrowRight, FiZap, FiShield, FiClock } from 'react-icons/fi';
import { HiLightBulb } from 'react-icons/hi';

function Home() {
  const features = [
    { icon: <FiFileText />, title: 'Resume Analyzer', desc: 'AI-powered resume review with ATS compatibility score and detailed feedback.', link: '/resume', color: 'blue' },
    { icon: <FiMap />, title: 'Career Roadmap', desc: 'Step-by-step learning paths tailored to your target role and experience level.', link: '/roadmap', color: 'purple' },
    { icon: <FiUserCheck />, title: 'Interview Prep', desc: 'Practice with realistic mock interviews and get instant AI evaluations.', link: '/interview', color: 'cyan' },
    { icon: <HiLightBulb />, title: 'Project Ideas', desc: 'Discover portfolio-worthy projects matched to your skills and career goals.', link: '/projects', color: 'green' },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-badge">🚀 AI-Powered Career Platform</div>
        <h1>Launch Your <span>Dream Career</span> with AI</h1>
        <p>Build standout resumes, ace interviews, and map your career path — all powered by advanced artificial intelligence.</p>
        <div className="hero-buttons">
          <Link to="/resume" className="btn-primary">
            Get Started Free <FiArrowRight />
          </Link>
          <a href="#features" className="btn-secondary">
            Explore Features
          </a>
        </div>
      </section>

      <div className="features-grid" id="features">
        {features.map((f, i) => (
          <Link to={f.link} key={i} className="feature-card">
            <div className={`feature-icon ${f.color}`}>{f.icon}</div>
            <h2>{f.title}</h2>
            <p>{f.desc}</p>
          </Link>
        ))}
      </div>

      <div className="stats-section">
        <div className="stat-item"><h3>4</h3><p>AI-Powered Tools</p></div>
        <div className="stat-item"><h3><FiZap /></h3><p>Instant Results</p></div>
        <div className="stat-item"><h3><FiShield /></h3><p>100% Free</p></div>
        <div className="stat-item"><h3><FiClock /></h3><p>24/7 Available</p></div>
      </div>
    </div>
  );
}

export default Home;