import { Navigate, Outlet } from 'react-router-dom'

const isDemoAuthenticated = true

function ProtectedLayout() {
  if (!isDemoAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedLayout
