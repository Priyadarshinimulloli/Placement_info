import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import DashboardCard from '../../components/DashboardCard';
import PageHeader from '../../components/PageHeader';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    rollNumber: 'CS2021-001',
    department: 'Computer Science',
    year: '4th Year',
    cgpa: '8.5',
  });

  const stats = [
    {
      title: 'Applications Sent',
      value: '12',
      icon: '📝',
      subtitle: 'Total applications',
      trend: { type: 'up', value: '+3 this week' },
      bgColor: '#e0f2fe',
      onClick: () => navigate('/student/applications')
    },
    {
      title: 'Interviews Scheduled',
      value: '5',
      icon: '📅',
      subtitle: 'Upcoming interviews',
      trend: { type: 'up', value: '+2 new' },
      bgColor: '#dbeafe',
    },
    {
      title: 'Offers Received',
      value: '2',
      icon: '🎉',
      subtitle: 'Job offers',
      bgColor: '#dcfce7',
    },
    {
      title: 'Profile Completion',
      value: '85%',
      icon: '✓',
      subtitle: '15% remaining',
      trend: { type: 'up', value: '+10%' },
      bgColor: '#fef3c7',
      onClick: () => navigate('/student/profile')
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Software Engineer',
      date: '2025-11-28',
      time: '10:00 AM',
      mode: 'Virtual',
      status: 'confirmed'
    },
    {
      id: 2,
      company: 'Innovation Labs',
      position: 'Full Stack Developer',
      date: '2025-11-30',
      time: '2:00 PM',
      mode: 'On-site',
      status: 'pending'
    },
    {
      id: 3,
      company: 'Cloud Systems Inc',
      position: 'Backend Developer',
      date: '2025-12-02',
      time: '11:30 AM',
      mode: 'Virtual',
      status: 'confirmed'
    },
  ];

  const recentApplications = [
    {
      id: 1,
      company: 'Data Analytics Co',
      position: 'Data Scientist',
      appliedDate: '2025-11-20',
      status: 'under-review'
    },
    {
      id: 2,
      company: 'AI Solutions',
      position: 'ML Engineer',
      appliedDate: '2025-11-18',
      status: 'shortlisted'
    },
    {
      id: 3,
      company: 'Web Technologies',
      position: 'Frontend Developer',
      appliedDate: '2025-11-15',
      status: 'rejected'
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      company: 'Future Tech',
      position: 'Software Development Engineer',
      location: 'Bangalore',
      type: 'Full-time',
      package: '12-15 LPA',
      deadline: '2025-12-05'
    },
    {
      id: 2,
      company: 'Global Solutions',
      position: 'Product Engineer',
      location: 'Pune',
      type: 'Full-time',
      package: '10-12 LPA',
      deadline: '2025-12-10'
    },
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'confirmed': { bg: '#dcfce7', color: '#166534', text: 'Confirmed' },
      'pending': { bg: '#fef3c7', color: '#854d0e', text: 'Pending' },
      'under-review': { bg: '#dbeafe', color: '#1e40af', text: 'Under Review' },
      'shortlisted': { bg: '#dcfce7', color: '#166534', text: 'Shortlisted' },
      'rejected': { bg: '#fee2e2', color: '#991b1b', text: 'Rejected' },
    };

    const style = statusStyles[status] || statusStyles['pending'];
    
    return (
      <span 
        className="status-badge" 
        style={{ backgroundColor: style.bg, color: style.color }}
      >
        {style.text}
      </span>
    );
  };

  return (
    <Layout>
      <div className="student-dashboard">
      <PageHeader
        title={`Welcome back, ${studentData.name}!`}
        subtitle="Here's what's happening with your placement journey"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Dashboard' }
        ]}
        actions={
          <button className="btn-primary" onClick={() => navigate('/student/jobs')}>
            Browse Jobs
          </button>
        }
      />

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            subtitle={stat.subtitle}
            trend={stat.trend}
            bgColor={stat.bgColor}
            onClick={stat.onClick}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Upcoming Interviews */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Interviews</h2>
            <Link to="/student/applications" className="view-all-link">
              View All →
            </Link>
          </div>
          
          {upcomingInterviews.length > 0 ? (
            <div className="interviews-list">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="interview-card">
                  <div className="interview-header">
                    <div>
                      <h3 className="interview-company">{interview.company}</h3>
                      <p className="interview-position">{interview.position}</p>
                    </div>
                    {getStatusBadge(interview.status)}
                  </div>
                  <div className="interview-details">
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{new Date(interview.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🕐</span>
                      <span>{interview.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{interview.mode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No upcoming interviews scheduled</p>
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Applications</h2>
            <Link to="/student/applications" className="view-all-link">
              View All →
            </Link>
          </div>
          
          <div className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id}>
                    <td className="company-cell">{app.company}</td>
                    <td>{app.position}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</td>
                    <td>{getStatusBadge(app.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recommended Jobs</h2>
            <Link to="/student/jobs" className="view-all-link">
              View All →
            </Link>
          </div>
          
          <div className="jobs-grid">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3 className="job-company">{job.company}</h3>
                  <span className="job-type">{job.type}</span>
                </div>
                <h4 className="job-position">{job.position}</h4>
                <div className="job-details">
                  <div className="job-detail">
                    <span className="detail-icon">📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <span className="detail-icon">💰</span>
                    <span>{job.package}</span>
                  </div>
                  <div className="job-detail">
                    <span className="detail-icon">⏰</span>
                    <span>Apply by {new Date(job.deadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
                <button className="btn-secondary btn-full-width">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default StudentDashboard;
