import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import PageHeader from '../../components/PageHeader';
import './CompanyList.css';

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'Tech Corp',
      logo: '🏢',
      sector: 'Technology',
      locations: ['Bangalore', 'Hyderabad'],
      activeOpenings: 5,
      package: '12-15 LPA',
      status: 'hiring',
      visitDate: '2025-12-05',
      description: 'Leading technology solutions provider',
    },
    {
      id: 2,
      name: 'Innovation Labs',
      logo: '💡',
      sector: 'Software',
      locations: ['Pune', 'Mumbai'],
      activeOpenings: 3,
      package: '10-14 LPA',
      status: 'hiring',
      visitDate: '2025-12-10',
      description: 'Innovation-driven software company',
    },
    {
      id: 3,
      name: 'Data Analytics Co',
      logo: '📊',
      sector: 'Analytics',
      locations: ['Bangalore', 'Delhi'],
      activeOpenings: 4,
      package: '11-13 LPA',
      status: 'hiring',
      visitDate: '2025-12-15',
      description: 'Data science and analytics specialists',
    },
    {
      id: 4,
      name: 'Cloud Systems Inc',
      logo: '☁️',
      sector: 'Cloud Computing',
      locations: ['Bangalore'],
      activeOpenings: 2,
      package: '15-18 LPA',
      status: 'upcoming',
      visitDate: '2025-12-20',
      description: 'Cloud infrastructure solutions',
    },
    {
      id: 5,
      name: 'AI Solutions',
      logo: '🤖',
      sector: 'Artificial Intelligence',
      locations: ['Bangalore', 'Pune', 'Hyderabad'],
      activeOpenings: 6,
      package: '14-17 LPA',
      status: 'hiring',
      visitDate: '2025-12-08',
      description: 'AI and ML product company',
    },
    {
      id: 6,
      name: 'Finance Tech',
      logo: '💰',
      sector: 'Fintech',
      locations: ['Mumbai', 'Bangalore'],
      activeOpenings: 0,
      package: '13-16 LPA',
      status: 'closed',
      visitDate: '2025-11-20',
      description: 'Financial technology solutions',
    },
  ];

  const sectors = ['all', 'Technology', 'Software', 'Analytics', 'Cloud Computing', 'Artificial Intelligence', 'Fintech'];
  const statuses = ['all', 'hiring', 'upcoming', 'closed'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = filterSector === 'all' || company.sector === filterSector;
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      hiring: { bg: '#dcfce7', color: '#166534', text: 'Hiring' },
      upcoming: { bg: '#dbeafe', color: '#1e40af', text: 'Upcoming' },
      closed: { bg: '#fee2e2', color: '#991b1b', text: 'Closed' },
    };
    const style = styles[status];
    return (
      <span className="status-badge" style={{ backgroundColor: style.bg, color: style.color }}>
        {style.text}
      </span>
    );
  };

  return (
    <Layout>
      <div className="company-list-page">
        <PageHeader
          title="Companies"
          subtitle="Explore companies visiting for placement"
          breadcrumbs={[
            { label: 'Home', link: '/' },
            { label: 'Dashboard', link: '/student/dashboard' },
            { label: 'Companies' }
          ]}
        />

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)}>
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector === 'all' ? 'All Sectors' : sector}
                </option>
              ))}
            </select>

            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}</p>
        </div>

        {/* Companies Grid */}
        <div className="companies-grid">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <Link key={company.id} to={`/student/companies/${company.id}`} className="company-card">
                <div className="company-header">
                  <div className="company-logo">{company.logo}</div>
                  {getStatusBadge(company.status)}
                </div>

                <h3 className="company-name">{company.name}</h3>
                <p className="company-sector">{company.sector}</p>
                <p className="company-description">{company.description}</p>

                <div className="company-info">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <span>{company.locations.join(', ')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">💰</span>
                    <span>{company.package}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <span>Visit: {new Date(company.visitDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>

                <div className="company-footer">
                  <span className="openings-count">
                    {company.activeOpenings > 0 
                      ? `${company.activeOpenings} Active ${company.activeOpenings === 1 ? 'Opening' : 'Openings'}`
                      : 'No Active Openings'}
                  </span>
                  <span className="view-details-arrow">→</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="empty-state">
              <p>No companies found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CompanyList;
