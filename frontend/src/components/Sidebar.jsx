import { Divider, Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { DRAWER_WIDTH } from '../utils/layout'

const navItems = [
  { label: 'Applicant Dashboard', path: '/dashboard/applicant' },
  { label: 'Recruiter Dashboard', path: '/dashboard/recruiter' },
  { label: 'Admin Dashboard', path: '/dashboard/admin' },
]

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid #E2E8F0',
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.active': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
