import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="secondary" fontWeight={800}>
              AI Resume Screening
            </Typography>
            <Typography variant="h2" color="primary" fontWeight={900} sx={{ my: 2 }}>
              Hire faster with an intelligent ATS
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Dummy landing page for the ATS frontend with routing, MUI, and authentication screens ready.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button size="large" variant="contained" component={RouterLink} to="/login">
                Login
              </Button>
              <Button size="large" variant="outlined" component={RouterLink} to="/register">
                Create Account
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, border: '1px solid #E2E8F0' }} elevation={0}>
              <Typography variant="h5" color="primary" fontWeight={800} gutterBottom>
                Frontend Ready
              </Typography>
              <Typography color="text.secondary">
                Navbar, sidebar, footer, dashboard layout, protected layout, login, register, and landing page are ready for integration.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default LandingPage
