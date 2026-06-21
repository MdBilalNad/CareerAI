import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiMap, FiUserCheck, FiZap, FiSun, FiMoon } from 'react-icons/fi';
import { HiLightBulb } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/resume', label: 'Resume', icon: <FiFileText /> },
    { path: '/roadmap', label: 'Roadmap', icon: <FiMap /> },
    { path: '/interview', label: 'Interview', icon: <FiUserCheck /> },
    { path: '/projects', label: 'Projects', icon: <HiLightBulb /> },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon"><FiZap /></div>
        CareerAI
      </Link>
      <div className="nav-links">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <button 
          className="theme-toggle"
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;