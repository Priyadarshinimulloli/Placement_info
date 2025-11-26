import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Job Postings', value: '8', icon: '💼', color: '#3b82f6' },
    { label: 'Total Applications', value: '342', icon: '📝', color: '#10b981' },
    { label: 'Shortlisted', value: '89', icon: '⭐', color: '#f59e0b' },
    { label: 'Hired', value: '24', icon: '✅', color: '#8b5cf6' }
  ];

  const jobPostings = [
    { id: 1, title: 'Software Engineer', applications: 45, shortlisted: 12, status: 'Active', package: '12-15 LPA' },
    { id: 2, title: 'Data Analyst', applications: 38, shortlisted: 10, status: 'Active', package: '10-12 LPA' },
    { id: 3, title: 'Frontend Developer', applications: 52, shortlisted: 15, status: 'Active', package: '10-14 LPA' },
    { id: 4, title: 'DevOps Engineer', applications: 28, shortlisted: 8, status: 'Active', package: '14-17 LPA' }
  ];

  const recentApplications = [
    { id: 1, name: 'Rahul Sharma', position: 'Software Engineer', branch: 'CSE', cgpa: 8.5, status: 'New', appliedDate: '2025-11-20' },
    { id: 2, name: 'Priya Patel', position: 'Data Analyst', branch: 'IT', cgpa: 8.8, status: 'Shortlisted', appliedDate: '2025-11-19' },
    { id: 3, name: 'Amit Kumar', position: 'Frontend Developer', branch: 'CSE', cgpa: 7.9, status: 'New', appliedDate: '2025-11-21' },
    { id: 4, name: 'Sneha Reddy', position: 'DevOps Engineer', branch: 'IT', cgpa: 9.1, status: 'Interview', appliedDate: '2025-11-18' },
    { id: 5, name: 'Vikram Singh', position: 'Software Engineer', branch: 'CSE', cgpa: 8.2, status: 'New', appliedDate: '2025-11-22' }
  ];

  const shortlistedCandidates = [
    { id: 1, name: 'Sneha Reddy', position: 'DevOps Engineer', branch: 'IT', cgpa: 9.1, skills: 'Docker, Kubernetes, AWS' },
    { id: 2, name: 'Priya Patel', position: 'Data Analyst', branch: 'IT', cgpa: 8.8, skills: 'Python, SQL, Tableau' },
    { id: 3, name: 'Rahul Sharma', position: 'Software Engineer', branch: 'CSE', cgpa: 8.5, skills: 'React, Node.js, MongoDB' },
    { id: 4, name: 'Arjun Mehta', position: 'Frontend Developer', branch: 'CSE', cgpa: 8.7, skills: 'React, TypeScript, CSS' }
  ];

  const interviewSchedule = [
    { id: 1, candidate: 'Sneha Reddy', position: 'DevOps Engineer', date: '2025-12-02', time: '10:00 AM', round: 'Technical' },
    { id: 2, candidate: 'Priya Patel', position: 'Data Analyst', date: '2025-12-02', time: '02:00 PM', round: 'Technical' },
    { id: 3, candidate: 'Arjun Mehta', position: 'Frontend Developer', date: '2025-12-03', time: '11:00 AM', round: 'HR' },
    { id: 4, candidate: 'Rahul Sharma', position: 'Software Engineer', date: '2025-12-03', time: '03:00 PM', round: 'Technical' }
  ];

  return (
    <div className="company-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🏢 Company Portal</h1>
            <p>Campus Recruitment Dashboard</p>
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
            className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Job Postings
          </button>
          <button 
            className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button 
            className={`tab ${activeTab === 'shortlisted' ? 'active' : ''}`}
            onClick={() => setActiveTab('shortlisted')}
          >
            Shortlisted
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="content-grid">
              <div className="content-card">
                <h3>📋 Recent Applications</h3>
                <div className="applications-list">
                  {recentApplications.slice(0, 5).map(app => (
                    <div key={app.id} className="application-item">
                      <div className="app-info">
                        <h4>{app.name}</h4>
                        <p>{app.position} • {app.branch} • CGPA: {app.cgpa}</p>
                      </div>
                      <span className={`badge badge-${app.status.toLowerCase()}`}>{app.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-card">
                <h3>📅 Upcoming Interviews</h3>
                <div className="interviews-list">
                  {interviewSchedule.map(interview => (
                    <div key={interview.id} className="interview-item">
                      <div className="interview-info">
                        <h4>{interview.candidate}</h4>
                        <p>{interview.position} • {interview.round} Round</p>
                      </div>
                      <div className="interview-time">
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                        <span>{interview.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="tab-content">
            <div className="content-card full-width">
              <div className="card-header">
                <h3>💼 Active Job Postings</h3>
                <button className="btn-add">+ Post New Job</button>
              </div>
              <div className="jobs-grid">
                {jobPostings.map(job => (
                  <div key={job.id} className="job-posting-card">
                    <div className="job-card-header">
                      <h4>{job.title}</h4>
                      <span className="badge badge-active">{job.status}</span>
                    </div>
                    <div className="job-stats">
                      <div className="stat-item">
                        <span className="stat-value">{job.applications}</span>
                        <span className="stat-label">Applications</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">{job.shortlisted}</span>
                        <span className="stat-label">Shortlisted</span>
                      </div>
                    </div>
                    <p className="job-package">💰 {job.package}</p>
                    <button className="btn-view">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="tab-content">
            <div className="content-card full-width">
              <div className="card-header">
                <h3>📝 All Applications</h3>
                <div className="filter-buttons">
                  <button className="btn-filter active">All</button>
                  <button className="btn-filter">New</button>
                  <button className="btn-filter">Shortlisted</button>
                  <button className="btn-filter">Interview</button>
                </div>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Position</th>
                      <th>Branch</th>
                      <th>CGPA</th>
                      <th>Applied Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map(app => (
                      <tr key={app.id}>
                        <td>{app.name}</td>
                        <td>{app.position}</td>
                        <td><span className="badge badge-branch">{app.branch}</span></td>
                        <td>{app.cgpa}</td>
                        <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge badge-${app.status.toLowerCase()}`}>{app.status}</span>
                        </td>
                        <td>
                          <button className="btn-action">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shortlisted' && (
          <div className="tab-content">
            <div className="content-card full-width">
              <div className="card-header">
                <h3>⭐ Shortlisted Candidates</h3>
                <button className="btn-add">Schedule Interview</button>
              </div>
              <div className="candidates-grid">
                {shortlistedCandidates.map(candidate => (
                  <div key={candidate.id} className="candidate-card">
                    <div className="candidate-header">
                      <div className="candidate-avatar">👤</div>
                      <div>
                        <h4>{candidate.name}</h4>
                        <p>{candidate.branch} • CGPA: {candidate.cgpa}</p>
                      </div>
                    </div>
                    <div className="candidate-position">
                      <strong>Applied for:</strong> {candidate.position}
                    </div>
                    <div className="candidate-skills">
                      <strong>Skills:</strong>
                      <p>{candidate.skills}</p>
                    </div>
                    <div className="candidate-actions">
                      <button className="btn-secondary">View Profile</button>
                      <button className="btn-primary">Schedule Interview</button>
                    </div>
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

export default CompanyDashboard;
