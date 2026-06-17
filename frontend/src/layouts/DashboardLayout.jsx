import { Box, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { DRAWER_WIDTH } from '../utils/layout'

function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, ml: `${DRAWER_WIDTH}px` }}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default DashboardLayout
