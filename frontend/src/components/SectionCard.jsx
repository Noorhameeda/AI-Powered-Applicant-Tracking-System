import { Card, CardContent, Stack, Typography } from '@mui/material'

function SectionCard({ title, description, items = [] }) {
  return (
    <Card elevation={0} sx={{ height: '100%', border: '1px solid #E2E8F0' }}>
      <CardContent>
        <Typography variant="h6" color="primary" fontWeight={800} gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Stack spacing={1}>
          {items.map((item) => (
            <Typography key={item} variant="body2">
              {item}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SectionCard
