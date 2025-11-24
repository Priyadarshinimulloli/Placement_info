import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentProfile from './pages/student/StudentProfile'
import StudentApplications from './pages/student/StudentApplications'
import StudentJobs from './pages/student/StudentJobs'
import CompanyList from './pages/student/CompanyList'
import CompanyDetail from './pages/student/CompanyDetail'
import Notifications from './pages/student/Notifications'
import Settings from './pages/student/Settings'
import Analytics from './pages/student/Analytics'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Student Portal Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/applications" element={<StudentApplications />} />
        <Route path="/student/jobs" element={<StudentJobs />} />
        <Route path="/student/companies" element={<CompanyList />} />
        <Route path="/student/companies/:id" element={<CompanyDetail />} />
        <Route path="/student/notifications" element={<Notifications />} />
        <Route path="/student/settings" element={<Settings />} />
        <Route path="/student/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  )
}

export default App
