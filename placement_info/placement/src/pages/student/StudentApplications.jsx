import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../components/PageHeader';
import { applicationsAPI } from '../../services/api';
import './StudentApplications.css';

const StudentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        // Fetch applications for student_id = 1 (demo)
        const result = await applicationsAPI.getAll({ student_id: 1 });
        if (result.success) {
          setApplications(result.data);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      'applied': { bg: '#dbeafe', color: '#1e40af', text: 'Applied' },
      'under-review': { bg: '#fef3c7', color: '#854d0e', text: 'Under Review' },
      'shortlisted': { bg: '#dbeafe', color: '#1e40af', text: 'Shortlisted' },
      'interview-scheduled': { bg: '#e0e7ff', color: '#3730a3', text: 'Interview Scheduled' },
      'selected': { bg: '#dcfce7', color: '#166534', text: 'Selected' },
      'rejected': { bg: '#fee2e2', color: '#991b1b', text: 'Rejected' },
    };
    const style = statusStyles[status] || statusStyles['applied'];
    return (
      <span style={{ backgroundColor: style.bg, color: style.color, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
        {style.text}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">Loading applications...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="student-applications">
      <PageHeader
        title="My Applications"
        subtitle="Track and manage your job applications"
        breadcrumbs={[
          { label: 'Home', link: '/' },
          { label: 'Dashboard', link: '/student/dashboard' },
          { label: 'Applications' }
        ]}
      />

      <div className="applications-content">
        {/* Filters */}
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setFilter('all')} style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '6px', border: filter === 'all' ? '2px solid #3b82f6' : '1px solid #ddd', background: filter === 'all' ? '#eff6ff' : 'white' }}>
            All ({applications.length})
          </button>
          <button onClick={() => setFilter('applied')} style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '6px', border: filter === 'applied' ? '2px solid #3b82f6' : '1px solid #ddd', background: filter === 'applied' ? '#eff6ff' : 'white' }}>
            Applied
          </button>
          <button onClick={() => setFilter('shortlisted')} style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '6px', border: filter === 'shortlisted' ? '2px solid #3b82f6' : '1px solid #ddd', background: filter === 'shortlisted' ? '#eff6ff' : 'white' }}>
            Shortlisted
          </button>
          <button onClick={() => setFilter('selected')} style={{ marginRight: '10px', padding: '8px 16px', borderRadius: '6px', border: filter === 'selected' ? '2px solid #3b82f6' : '1px solid #ddd', background: filter === 'selected' ? '#eff6ff' : 'white' }}>
            Selected
          </button>
        </div>

        {/* Applications Table */}
        {filteredApplications.length > 0 ? (
          <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Company</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Position</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Applied Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>CGPA</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px' }}>{app.company_name}</td>
                    <td style={{ padding: '12px' }}>{app.job_title}</td>
                    <td style={{ padding: '12px' }}>{new Date(app.applied_date).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>{getStatusBadge(app.status)}</td>
                    <td style={{ padding: '12px' }}>{app.cgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="placeholder-card">
            <div className="placeholder-icon">📋</div>
            <h2>No Applications Yet</h2>
            <p>You haven't applied to any jobs yet. Start browsing opportunities!</p>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default StudentApplications;
