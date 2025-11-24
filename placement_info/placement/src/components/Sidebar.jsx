import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: '/student/dashboard',
      icon: '📊',
      label: 'Dashboard',
    },
    {
      path: '/student/profile',
      icon: '👤',
      label: 'Profile',
    },
    {
      path: '/student/jobs',
      icon: '💼',
      label: 'Job Openings',
    },
    {
      path: '/student/applications',
      icon: '📋',
      label: 'Applications',
    },
    {
      path: '/student/companies',
      icon: '🏢',
      label: 'Companies',
    },
    {
      path: '/student/analytics',
      icon: '📈',
      label: 'Analytics',
    },
    {
      path: '/student/notifications',
      icon: '🔔',
      label: 'Notifications',
      badge: 3,
    },
    {
      path: '/student/settings',
      icon: '⚙️',
      label: 'Settings',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          {!isCollapsed && <span className="logo-text">PlaceHub</span>}
        </div>
        <button 
          className="toggle-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="nav-label">{item.label}</span>
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/logout" className="nav-item logout">
          <span className="nav-icon">🚪</span>
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
