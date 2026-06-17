import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedLayout from '../layouts/ProtectedLayout'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Register from '../pages/Register'

function PlaceholderDashboard({ title }) {
  return <h1>{title}</h1>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/dashboard/applicant" replace />} />
          <Route path="/dashboard/applicant" element={<PlaceholderDashboard title="Applicant Dashboard" />} />
          <Route path="/dashboard/recruiter" element={<PlaceholderDashboard title="Recruiter Dashboard" />} />
          <Route path="/dashboard/admin" element={<PlaceholderDashboard title="Admin Dashboard" />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
