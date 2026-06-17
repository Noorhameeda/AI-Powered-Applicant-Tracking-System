import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1B2A4A',
    },
    secondary: {
      main: '#D97706',
    },
    background: {
      default: '#F8FAFC',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main style={{ minHeight: '100vh', padding: '32px' }}>
          <h1>AI Powered Applicant Tracking System</h1>
          <p>React, Vite, MUI, Router, Axios, React Query, and React Hook Form are ready.</p>
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
