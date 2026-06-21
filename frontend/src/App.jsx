import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import CareerRoadmap from './pages/CareerRoadmap';
import InterviewPrep from './pages/InterviewPrep';
import ProjectIdeas from './pages/ProjectIdeas';

function App() {
  const [backendOnline, setBackendOnline] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('https://careerai-api.onrender.com/', {
          signal: AbortSignal.timeout(5000)
        });
        if (res.ok) setBackendOnline(true);
      } catch (e) {
        setBackendOnline(false);
      }
      setChecking(false);
    };
    checkBackend();
  }, []);

  if (checking) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: 'white',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div className="loading-spinner" style={{ marginBottom: '20px' }}></div>
        <h2>🚀 Loading CareerAI</h2>
        <p style={{ color: '#94a3b8' }}>Waking up the server...</p>
        <p style={{ color: '#64748b', fontSize: '0.85rem' }}>This may take 30-60 seconds on first load</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<ResumeAnalyzer />} />
            <Route path="/roadmap" element={<CareerRoadmap />} />
            <Route path="/interview" element={<InterviewPrep />} />
            <Route path="/projects" element={<ProjectIdeas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;