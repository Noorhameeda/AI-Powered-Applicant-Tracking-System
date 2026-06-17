import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Login() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0' }}>
        <Typography variant="h4" color="primary" fontWeight={900} gutterBottom>
          Login
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Dummy authentication screen for ATS users.
        </Typography>
        <Stack spacing={2}>
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" size="large" component={RouterLink} to="/dashboard/applicant">
            Sign In
          </Button>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Button component={RouterLink} to="/register">
            Create a new account
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
