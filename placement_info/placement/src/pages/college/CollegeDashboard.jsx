import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeDashboard.css';

const CollegeDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Students', value: '1,245', icon: '👨‍🎓', color: '#3b82f6' },
    { label: 'Companies Registered', value: '87', icon: '🏢', color: '#10b981' },
    { label: 'Active Drives', value: '12', icon: '📊', color: '#f59e0b' },
    { label: 'Placements Done', value: '892', icon: '✅', color: '#8b5cf6' }
  ];

  const recentStudents = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@college.edu', branch: 'CSE', cgpa: 8.5, status: 'Eligible' },
    { id: 2, name: 'Priya Patel', email: 'priya@college.edu', branch: 'IT', cgpa: 8.8, status: 'Eligible' },
    { id: 3, name: 'Amit Kumar', email: 'amit@college.edu', branch: 'ECE', cgpa: 7.9, status: 'Eligible' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@college.edu', branch: 'CSE', cgpa: 9.1, status: 'Placed' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@college.edu', branch: 'IT', cgpa: 8.2, status: 'Eligible' }
  ];

  const activeCompanies = [
    { id: 1, name: 'Tech Corp', logo: '🏢', openings: 5, package: '12-15 LPA', status: 'Active' },
    { id: 2, name: 'Infosys', logo: '💼', openings: 8, package: '8-10 LPA', status: 'Active' },
    { id: 3, name: 'TCS', logo: '🏭', openings: 12, package: '7-9 LPA', status: 'Active' },
    { id: 4, name: 'Wipro', logo: '🏢', openings: 6, package: '8-11 LPA', status: 'Active' }
  ];

  const upcomingDrives = [
    { id: 1, company: 'Amazon', date: '2025-12-05', type: 'On Campus', positions: 4 },
    { id: 2, company: 'Google', date: '2025-12-12', type: 'Virtual', positions: 3 },
    { id: 3, company: 'Microsoft', date: '2025-12-18', type: 'On Campus', positions: 6 },
    { id: 4, company: 'Adobe', date: '2025-12-22', type: 'Virtual', positions: 2 }
  ];

  const placementStats = [
    { branch: 'CSE', total: 320, placed: 285, percentage: 89 },
    { branch: 'IT', total: 280, placed: 238, percentage: 85 },
    { branch: 'ECE', total: 245, placed: 196, percentage: 80 },
    { branch: 'EEE', total: 200, placed: 148, percentage: 74 }
  ];

  return (
    <div className="college-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🏫 College Dashboard</h1>
            <p>Placement Management System</p>
          </div>
          <button onClick={() => navigate('/')} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Stats Section */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button 
            className={`tab ${activeTab === 'companies' ? 'active' : ''}`}
            onClick={() => setActiveTab('companies')}
          >
            Companies
          </button>
          <button 
            className={`tab ${activeTab === 'drives' ? 'active' : ''}`}
            onClick={() => setActiveTab('drives')}
          >
            Placement Drives
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="content-grid">
              <div className="content-card">
                <h3>📊 Placement Statistics</h3>
                <div className="stats-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Branch</th>
                        <th>Total</th>
                        <th>Placed</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placementStats.map(stat => (
                        <tr key={stat.branch}>
                          <td>{stat.branch}</td>
                          <td>{stat.total}</td>
                          <td>{stat.placed}</td>
                          <td>
                            <div className="progress-cell">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill" 
                                  style={{ width: `${stat.percentage}%` }}
                                ></div>
                              </div>
                              <span>{stat.percentage}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="content-card">
                <h3>📅 Upcoming Drives</h3>
                <div className="drives-list">
                  {upcomingDrives.map(drive => (
                    <div key={drive.id} className="drive-item">
                      <div className="drive-info">
                        <h4>{drive.company}</h4>
                        <p>📍 {drive.type} • 💼 {drive.positions} positions</p>
                      </div>
                      <div className="drive-date">{new Date(drive.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="content-card full-width">
              <div className="card-header">
                <h3>👨‍🎓 Recent Students</h3>
                <button className="btn-add">+ Add Student</button>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Branch</th>
                      <th>CGPA</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td><span className="badge badge-branch">{student.branch}</span></td>
                        <td>{student.cgpa}</td>
                        <td>
                          <span className={`badge ${student.status === 'Placed' ? 'badge-placed' : 'badge-eligible'}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-action">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="tab-content">
            <div className="content-card full-width">
              <div className="card-header">
                <h3>🏢 Active Companies</h3>
                <button className="btn-add">+ Add Company</button>
              </div>
              <div className="companies-grid">
                {activeCompanies.map(company => (
                  <div key={company.id} className="company-card">
                    <div className="company-logo-large">{company.logo}</div>
                    <h4>{company.name}</h4>
                    <div className="company-details">
                      <p>💼 {company.openings} Openings</p>
                      <p>💰 {company.package}</p>
                      <span className="badge badge-active">{company.status}</span>
                    </div>
                    <button className="btn-view">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'drives' && (
          <div className="tab-content">
            <div className="content-card full-width">
              <div className="card-header">
                <h3>📊 Placement Drives</h3>
                <button className="btn-add">+ Schedule Drive</button>
              </div>
              <div className="drives-grid">
                {upcomingDrives.map(drive => (
                  <div key={drive.id} className="drive-card">
                    <div className="drive-card-header">
                      <h4>{drive.company}</h4>
                      <span className="badge badge-active">Scheduled</span>
                    </div>
                    <div className="drive-details">
                      <div className="detail-row">
                        <span className="detail-label">📅 Date</span>
                        <span className="detail-value">{new Date(drive.date).toLocaleDateString()}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">📍 Type</span>
                        <span className="detail-value">{drive.type}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">💼 Positions</span>
                        <span className="detail-value">{drive.positions}</span>
                      </div>
                    </div>
                    <button className="btn-manage">Manage Drive</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDashboard;
