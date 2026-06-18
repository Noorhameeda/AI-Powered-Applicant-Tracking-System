import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedLayout from '../layouts/ProtectedLayout'
import AdminDashboard from '../pages/AdminDashboard'
import ApplicantDashboard from '../pages/ApplicantDashboard'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import RecruiterDashboard from '../pages/RecruiterDashboard'
import Register from '../pages/Register'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/dashboard/applicant" replace />} />
          <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
          <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
