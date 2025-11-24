import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../components/PageHeader';
import { jobsAPI, applicationsAPI } from '../../services/api';
import './StudentJobs.css';

const StudentJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  
  // Mock student skills - in real app, fetch from profile
  const studentSkills = ['JavaScript', 'React', 'Node.js', 'SQL', 'Python'];

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // Fetch all jobs
        const jobsData = await jobsAPI.getAll({ status: 'active' });
        if (jobsData.success) {
          const formattedJobs = jobsData.data.map(job => ({
            id: job.id,
            company: job.company_name,
            logo: '🏢',
            title: job.title,
            location: job.location,
            type: job.job_type,
            package: job.package_min && job.package_max 
              ? `${job.package_min}-${job.package_max} LPA` 
              : 'Not specified',
            posted: new Date(job.created_at).toLocaleDateString(),
            deadline: job.deadline,
            description: job.description,
            requiredSkills: job.required_skills ? JSON.parse(job.required_skills) : [],
            preferredSkills: job.preferred_skills ? JSON.parse(job.preferred_skills) : [],
            eligibility: job.eligibility_criteria ? JSON.parse(job.eligibility_criteria) : {},
            applicationCount: job.application_count || 0,
          }));
          setJobs(formattedJobs);
        }

        // Fetch student's applications (student_id = 1 for demo)
        const applicationsData = await applicationsAPI.getAll({ student_id: 1 });
        if (applicationsData.success) {
          const applied = new Set(applicationsData.data.map(app => app.job_id));
          setAppliedJobs(applied);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const mockJobs = [
    {
      id: 1,
      company: 'Tech Corp',
      logo: '🏢',
      title: 'Software Development Engineer',
      location: 'Bangalore',
      type: 'Full-time',
      package: '12-15 LPA',
      experience: '0-2 years',
      posted: '2 days ago',
      deadline: '2025-12-05',
      description: 'We are looking for talented software engineers to join our team.',
      requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git'],
      preferredSkills: ['TypeScript', 'AWS', 'Docker'],
      eligibility: {
        minCGPA: 7.0,
        branches: ['CS', 'IT', 'ECE'],
        graduationYear: 2026,
        backlogs: 'No active backlogs',
      },
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams',
        'Write clean, maintainable code',
      ],
      applied: false,
    },
    {
      id: 2,
      company: 'Data Analytics Inc',
      logo: '📊',
      title: 'Data Analyst',
      location: 'Hyderabad',
      type: 'Full-time',
      package: '10-12 LPA',
      experience: '0-1 years',
      posted: '1 day ago',
      deadline: '2025-12-08',
      description: 'Join our data team to analyze and derive insights from complex datasets.',
      requiredSkills: ['Python', 'SQL', 'Excel', 'Tableau', 'Statistics'],
      preferredSkills: ['R', 'Power BI', 'Machine Learning'],
      eligibility: {
        minCGPA: 7.5,
        branches: ['CS', 'IT', 'Mathematics'],
        graduationYear: 2026,
        backlogs: 'No active backlogs',
      },
      responsibilities: [
        'Analyze large datasets to identify trends',
        'Create dashboards and reports',
        'Work with stakeholders to understand requirements',
      ],
      applied: false,
    },
    {
      id: 3,
      company: 'Cloud Systems',
      logo: '☁️',
      title: 'DevOps Engineer',
      location: 'Pune',
      type: 'Full-time',
      package: '14-17 LPA',
      experience: '0-2 years',
      posted: '3 days ago',
      deadline: '2025-12-10',
      description: 'Looking for DevOps engineers to manage our cloud infrastructure.',
      requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      preferredSkills: ['Terraform', 'Ansible', 'Python'],
      eligibility: {
        minCGPA: 7.2,
        branches: ['CS', 'IT'],
        graduationYear: 2026,
        backlogs: 'Maximum 1 backlog',
      },
      responsibilities: [
        'Manage cloud infrastructure',
        'Implement CI/CD pipelines',
        'Monitor system performance',
      ],
      applied: true,
    },
    {
      id: 4,
      company: 'AI Solutions',
      logo: '🤖',
      title: 'Machine Learning Engineer',
      location: 'Bangalore',
      type: 'Full-time',
      package: '15-18 LPA',
      experience: '0-2 years',
      posted: '5 days ago',
      deadline: '2025-12-12',
      description: 'Build and deploy machine learning models at scale.',
      requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Statistics'],
      preferredSkills: ['Deep Learning', 'NLP', 'Computer Vision'],
      eligibility: {
        minCGPA: 8.0,
        branches: ['CS', 'IT'],
        graduationYear: 2026,
        backlogs: 'No active backlogs',
      },
      responsibilities: [
        'Develop ML models for production',
        'Optimize model performance',
        'Collaborate with data scientists',
      ],
      applied: false,
    },
  ];

  // Calculate skill match percentage
  const calculateSkillMatch = (job) => {
    const allRequiredSkills = job.requiredSkills || [];
    if (allRequiredSkills.length === 0) return 50;
    const matchedSkills = allRequiredSkills.filter(skill => 
      studentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    );
    return Math.round((matchedSkills.length / allRequiredSkills.length) * 100);
  };

  // Get missing skills
  const getMissingSkills = (job) => {
    return job.requiredSkills.filter(skill => 
      !studentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    );
  };

  // Get matched skills
  const getMatchedSkills = (job) => {
    return job.requiredSkills.filter(skill => 
      studentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    );
  };

  // Filter jobs
  const filteredJobs = loading ? [] : jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'applied') return appliedJobs.has(job.id);
    if (filter === 'recommended') {
      const matchPercentage = calculateSkillMatch(job);
      return matchPercentage >= 60;
    }
    return true;
  });

  // Sort by skill match
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    return calculateSkillMatch(b) - calculateSkillMatch(a);
  });

  const handleApply = async (jobId) => {
    try {
      const applicationData = {
        student_id: 1, // Demo student ID
        job_id: jobId,
        cover_letter: 'I am very interested in this position.'
      };
      
      const result = await applicationsAPI.create(applicationData);
      if (result.success) {
        setAppliedJobs(new Set([...appliedJobs, jobId]));
        alert('Application submitted successfully!');
      }
    } catch (error) {
      alert(error.message || 'Failed to submit application');
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#22c55e';
    if (percentage >= 60) return '#3b82f6';
    if (percentage >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return 'Excellent Match';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Fair Match';
    return 'Low Match';
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-state">Loading jobs...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="student-jobs">
        <PageHeader
          title="Job Opportunities"
          subtitle="Browse and apply for positions matched to your skills"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Dashboard', link: '/student/dashboard' },
            { label: 'Jobs' }
          ]}
        />

        {/* Skills Summary */}
        <div className="skills-summary">
          <h3>Your Skills Profile</h3>
          <div className="current-skills">
            {studentSkills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="jobs-filters">
          <button 
            className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Jobs ({jobs.length})
          </button>
          <button 
            className={`filter-chip ${filter === 'recommended' ? 'active' : ''}`}
            onClick={() => setFilter('recommended')}
          >
            Recommended ({jobs.filter(j => calculateSkillMatch(j) >= 60).length})
          </button>
          <button 
            className={`filter-chip ${filter === 'applied' ? 'active' : ''}`}
            onClick={() => setFilter('applied')}
          >
            Applied ({jobs.filter(j => j.applied).length})
          </button>
        </div>

        <div className="jobs-container">
          {/* Jobs List */}
          <div className="jobs-list">
            {sortedJobs.length > 0 ? (
              sortedJobs.map(job => {
                const matchPercentage = calculateSkillMatch(job);
                const matchedSkills = getMatchedSkills(job);
                const missingSkills = getMissingSkills(job);

                return (
                  <div 
                    key={job.id} 
                    className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="job-card-header">
                      <div className="job-company-info">
                        <span className="company-logo">{job.logo}</span>
                        <div>
                          <h3>{job.title}</h3>
                          <p className="company-name">{job.company}</p>
                        </div>
                      </div>
                      {appliedJobs.has(job.id) && (
                        <span className="applied-badge">Applied ✓</span>
                      )}
                    </div>

                    {/* Skill Match Indicator */}
                    <div className="skill-match">
                      <div className="match-bar-container">
                        <div 
                          className="match-bar" 
                          style={{ 
                            width: `${matchPercentage}%`,
                            backgroundColor: getMatchColor(matchPercentage)
                          }}
                        ></div>
                      </div>
                      <div className="match-info">
                        <span className="match-percentage" style={{ color: getMatchColor(matchPercentage) }}>
                          {matchPercentage}% Match
                        </span>
                        <span className="match-label">{getMatchLabel(matchPercentage)}</span>
                      </div>
                    </div>

                    <div className="job-details-preview">
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span>{job.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">💰</span>
                        <span>{job.package}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">⏰</span>
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="skills-match-preview">
                      <div className="matched-skills-count">
                        ✓ {matchedSkills.length} of {job.requiredSkills.length} skills matched
                      </div>
                      {missingSkills.length > 0 && (
                        <div className="missing-skills-hint">
                          Missing: {missingSkills.slice(0, 2).join(', ')}
                          {missingSkills.length > 2 && ` +${missingSkills.length - 2} more`}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <p>No jobs found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Job Details Panel */}
          {selectedJob && (
            <div className="job-details-panel">
              <div className="job-details-header">
                <div className="job-title-section">
                  <span className="company-logo-large">{selectedJob.logo}</span>
                  <div>
                    <h2>{selectedJob.title}</h2>
                    <p className="company-name-large">{selectedJob.company}</p>
                    <div className="job-meta">
                      <span>📍 {selectedJob.location}</span>
                      <span>💰 {selectedJob.package}</span>
                      <span>👥 {selectedJob.experience}</span>
                      <span>🕐 {selectedJob.posted}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className={`btn-apply ${appliedJobs.has(selectedJob.id) ? 'applied' : ''}`}
                  onClick={() => !appliedJobs.has(selectedJob.id) && handleApply(selectedJob.id)}
                  disabled={appliedJobs.has(selectedJob.id)}
                >
                  {appliedJobs.has(selectedJob.id) ? 'Applied ✓' : 'Apply Now'}
                </button>
              </div>

              {/* Skill Match Analysis */}
              <div className="match-analysis">
                <h3>Skill Match Analysis</h3>
                <div className="match-percentage-large" style={{ color: getMatchColor(calculateSkillMatch(selectedJob)) }}>
                  {calculateSkillMatch(selectedJob)}% {getMatchLabel(calculateSkillMatch(selectedJob))}
                </div>

                <div className="skills-breakdown">
                  <div className="skills-section">
                    <h4>✓ Skills You Have ({getMatchedSkills(selectedJob).length})</h4>
                    <div className="skills-tags">
                      {getMatchedSkills(selectedJob).map((skill, index) => (
                        <span key={index} className="skill-tag matched">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {getMissingSkills(selectedJob).length > 0 && (
                    <div className="skills-section">
                      <h4>⚠️ Skills You Need ({getMissingSkills(selectedJob).length})</h4>
                      <div className="skills-tags">
                        {getMissingSkills(selectedJob).map((skill, index) => (
                          <span key={index} className="skill-tag missing">{skill}</span>
                        ))}
                      </div>
                      <div className="recommendation-box">
                        <strong>💡 Recommendation:</strong> Consider taking courses in these areas to improve your match score.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="job-description">
                <h3>About the Role</h3>
                <p>{selectedJob.description}</p>
              </div>

              <div className="job-responsibilities">
                <h3>Key Responsibilities</h3>
                <ul>
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="job-eligibility">
                <h3>Eligibility Criteria</h3>
                <div className="eligibility-grid">
                  <div className="eligibility-item">
                    <span className="eligibility-label">Minimum CGPA</span>
                    <span className="eligibility-value">{selectedJob.eligibility.minCGPA}</span>
                  </div>
                  <div className="eligibility-item">
                    <span className="eligibility-label">Eligible Branches</span>
                    <span className="eligibility-value">{selectedJob.eligibility.branches.join(', ')}</span>
                  </div>
                  <div className="eligibility-item">
                    <span className="eligibility-label">Graduation Year</span>
                    <span className="eligibility-value">{selectedJob.eligibility.graduationYear}</span>
                  </div>
                  <div className="eligibility-item">
                    <span className="eligibility-label">Backlogs</span>
                    <span className="eligibility-value">{selectedJob.eligibility.backlogs}</span>
                  </div>
                </div>
              </div>

              {selectedJob.preferredSkills.length > 0 && (
                <div className="preferred-skills">
                  <h3>Preferred Skills (Bonus)</h3>
                  <div className="skills-tags">
                    {selectedJob.preferredSkills.map((skill, index) => (
                      <span key={index} className="skill-tag preferred">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentJobs;