import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { APP_NAME } from '../utils/constants'

function Navbar() {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ color: 'inherit', flexGrow: 1, fontWeight: 800 }}>
          {APP_NAME}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="secondary" variant="contained" component={RouterLink} to="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
