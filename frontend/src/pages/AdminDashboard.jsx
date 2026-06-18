import { Box, Grid, Typography } from '@mui/material'
import SectionCard from '../components/SectionCard'

function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" color="primary" fontWeight={900} gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        UI skeleton for platform administration.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Users"
            description="Manage platform users and permissions."
            items={['1,240 Applicants', '86 Recruiters', '6 Admins']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Recruiters"
            description="Review recruiter accounts and activity."
            items={['12 Pending Approvals', '44 Active This Week', '3 Flagged Reviews']}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard
            title="Reports"
            description="Track system reports and audit summaries."
            items={['Monthly Hiring Report', 'Security Audit Log', 'Usage Analytics']}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard
