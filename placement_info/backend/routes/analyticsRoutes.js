const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get placement statistics
router.get('/stats', async (req, res) => {
  try {
    // Total students
    const [totalStudents] = await db.query('SELECT COUNT(*) as count FROM students');
    
    // Total applications
    const [totalApplications] = await db.query('SELECT COUNT(*) as count FROM applications');
    
    // Placed students (status = 'selected')
    const [placedStudents] = await db.query(
      "SELECT COUNT(DISTINCT student_id) as count FROM applications WHERE status = 'selected'"
    );
    
    // Active jobs
    const [activeJobs] = await db.query(
      "SELECT COUNT(*) as count FROM jobs WHERE status = 'active'"
    );
    
    // Average package
    const [avgPackage] = await db.query(
      'SELECT AVG((package_min + package_max) / 2) as average FROM jobs WHERE status = "active"'
    );

    res.json({
      success: true,
      data: {
        totalStudents: totalStudents[0].count,
        totalApplications: totalApplications[0].count,
        placedStudents: placedStudents[0].count,
        activeJobs: activeJobs[0].count,
        averagePackage: avgPackage[0].average || 0,
        placementRate: totalStudents[0].count > 0 
          ? ((placedStudents[0].count / totalStudents[0].count) * 100).toFixed(2)
          : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get department-wise statistics
router.get('/departments', async (req, res) => {
  try {
    const [departments] = await db.query(`
      SELECT 
        s.department,
        COUNT(DISTINCT s.id) as total_students,
        COUNT(DISTINCT CASE WHEN a.status = 'selected' THEN s.id END) as placed_students,
        AVG(s.cgpa) as average_cgpa,
        ROUND((COUNT(DISTINCT CASE WHEN a.status = 'selected' THEN s.id END) / COUNT(DISTINCT s.id)) * 100, 2) as placement_rate
      FROM students s
      LEFT JOIN applications a ON s.id = a.student_id
      GROUP BY s.department
      ORDER BY placement_rate DESC
    `);

    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get top skills in demand
router.get('/skills', async (req, res) => {
  try {
    const [skills] = await db.query(`
      SELECT 
        skill_name,
        COUNT(*) as demand_count,
        AVG(proficiency_level) as avg_proficiency
      FROM student_skills
      GROUP BY skill_name
      ORDER BY demand_count DESC
      LIMIT 10
    `);

    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get top companies by placements
router.get('/companies', async (req, res) => {
  try {
    const [companies] = await db.query(`
      SELECT 
        c.name,
        c.industry,
        COUNT(DISTINCT a.id) as total_applications,
        COUNT(DISTINCT CASE WHEN a.status = 'selected' THEN a.id END) as placements,
        AVG((j.package_min + j.package_max) / 2) as avg_package
      FROM companies c
      LEFT JOIN jobs j ON c.id = j.company_id
      LEFT JOIN applications a ON j.id = a.job_id
      GROUP BY c.id
      ORDER BY placements DESC
      LIMIT 10
    `);

    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get application status distribution
router.get('/applications/status', async (req, res) => {
  try {
    const [statusData] = await db.query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM applications
      GROUP BY status
    `);

    res.json({ success: true, data: statusData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
