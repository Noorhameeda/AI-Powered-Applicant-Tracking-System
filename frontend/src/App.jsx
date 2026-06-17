import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

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
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
