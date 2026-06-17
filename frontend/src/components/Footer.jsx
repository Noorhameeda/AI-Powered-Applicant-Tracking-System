import { Box, Typography } from '@mui/material'

function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid #E2E8F0', py: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        AI Powered Applicant Tracking System frontend
      </Typography>
    </Box>
  )
}

export default Footer
