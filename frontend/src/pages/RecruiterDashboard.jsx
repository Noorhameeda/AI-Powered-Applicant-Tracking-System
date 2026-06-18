import { Box, Grid, Typography } from '@mui/material'
import SectionCard from '../components/SectionCard'

function RecruiterDashboard() {
  return (
    <Box>
      <Typography variant="h4" color="primary" fontWeight={900} gutterBottom>
        Recruiter Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        UI skeleton for recruiter hiring operations.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Jobs Posted"
            description="Monitor active and draft job posts."
            items={['Senior React Engineer', 'Backend Developer', 'HR Operations Associate']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Candidates"
            description="Review candidates in the hiring pipeline."
            items={['24 New Applications', '8 Shortlisted', '5 Interviews Scheduled']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Analytics"
            description="Summarize recruiting performance."
            items={['Time to Shortlist: 2 days', 'Offer Rate: 18%', 'Response Rate: 82%']}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecruiterDashboard
