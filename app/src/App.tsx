import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ApplicantDashboard from './pages/dashboard/ApplicantDashboard';
import JobBoard from './pages/dashboard/JobBoard';
import JobDetails from './pages/dashboard/JobDetails';
import RecruiterDashboard from './pages/dashboard/RecruiterDashboard';
import CandidateRanking from './pages/dashboard/CandidateRanking';
import Pipeline from './pages/dashboard/Pipeline';
import ResumeAnalysis from './pages/dashboard/ResumeAnalysis';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProfilePage from './pages/dashboard/ProfilePage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<ApplicantDashboard />} />
          <Route path="/dashboard/jobs" element={<JobBoard />} />
          <Route path="/dashboard/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
          <Route path="/dashboard/ranking" element={<CandidateRanking />} />
          <Route path="/dashboard/pipeline" element={<Pipeline />} />
          <Route path="/dashboard/resume" element={<ResumeAnalysis />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
