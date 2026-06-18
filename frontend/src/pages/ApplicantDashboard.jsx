import { Box, Grid, Typography } from '@mui/material'
import SectionCard from '../components/SectionCard'

function ApplicantDashboard() {
  return (
    <Box>
      <Typography variant="h4" color="primary" fontWeight={900} gutterBottom>
        Applicant Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        UI skeleton for applicant activity and job discovery.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Applications"
            description="Track submitted applications and status updates."
            items={['Frontend Developer - Review', 'AI Analyst - Shortlisted', 'Product Intern - Applied']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Resume Score"
            description="Display the applicant resume strength score."
            items={['Overall Score: 86%', 'Skills Match: 91%', 'Experience Match: 78%']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Recommended Jobs"
            description="Show AI recommended roles for the applicant."
            items={['React Engineer', 'Full Stack Developer', 'UI Engineer']}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ApplicantDashboard
