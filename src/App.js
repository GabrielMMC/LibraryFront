import logo from './logo.svg';
import './App.css';
import React from 'react'
import MainRoutes from './Routes/MainRoutes';
import './styles.css'
import { ToastContent } from './utils/Alerts';
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material'

const Theme = createTheme({
  palette: {
    primary: { main: '#FEBD00' },
    secondary: { main: '#1976d2' },
    success: { main: '#693B9F' },
  }
})


function App() {
  return (
    <ThemeProvider theme={Theme}>
      <MainRoutes />
      <ToastContent />
    </ThemeProvider>
  );
}

export default App;
