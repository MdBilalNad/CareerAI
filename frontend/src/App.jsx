import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import CareerRoadmap from './pages/CareerRoadmap';
import InterviewPrep from './pages/InterviewPrep';
import ProjectIdeas from './pages/ProjectIdeas';
import './App.css';

function App() {
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