import { Button, Container, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Register() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #E2E8F0' }}>
        <Typography variant="h4" color="primary" fontWeight={900} gutterBottom>
          Register
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Dummy registration screen for applicant, recruiter, or admin onboarding.
        </Typography>
        <Stack spacing={2}>
          <TextField label="Full Name" fullWidth />
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <TextField label="Role" defaultValue="applicant" select fullWidth>
            <MenuItem value="applicant">Applicant</MenuItem>
            <MenuItem value="recruiter">Recruiter</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button variant="contained" size="large" component={RouterLink} to="/login">
            Create Account
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default Register
