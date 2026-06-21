import { FiHeart, FiZap } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3><FiZap style={{marginRight:8}} />CareerAI</h3>
          <p>AI-powered career platform helping students build better resumes, prepare for interviews, and plan their professional journey.</p>
        </div>
        <div className="footer-section">
          <h4>Features</h4>
          <a href="/resume">Resume Analyzer</a>
          <a href="/roadmap">Career Roadmap</a>
          <a href="/interview">Interview Prep</a>
          <a href="/projects">Project Ideas</a>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Documentation</a>
          <a href="#">Support</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        Built by Bilal <FiHeart className="heart-icon" /> for students | © 2026 CareerAI
      </div>
    </footer>
  );
}

export default Footer;