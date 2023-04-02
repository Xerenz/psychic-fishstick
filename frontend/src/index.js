
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import CustomSnackbar from './components/Snackbar';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard/*',
    element: <Dashboard />
  }
])

const theme = createTheme({
  palette: {
    primary: {
      main: '#6253FA',
      light: '#BCB1FF'
    },
    secondary: {
      main: '#FFC670',
      light: '#EDEBDC',
      dark: '#A9A3A3'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomSnackbar />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);