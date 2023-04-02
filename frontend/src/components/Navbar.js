import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton';
import { AppBar, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import useAuthStore from '../store/AuthStore';
import useSnackStore from '../store/SnackStore';
import {ReactComponent as LogoIcon} from '../assets/logo.svg'
import { authAxios, logoutUrl } from '../api';


export const Navbar = () => {
    let navigate = useNavigate()
    const {showSnackbar} = useSnackStore((state) => state)
    const {unauthenticate} = useAuthStore((state) => state)

    const handleNavigate = () => {
        navigate('/dashboard')
    }

    const handleLogOut = () => {
        authAxios.get(logoutUrl)
        .then((response) => {
            const message = response.data.detail
            showSnackbar(message)
            unauthenticate()
        })
        .catch((error) => {
            console.log('error', error)
            showSnackbar('Something went wrong!', 'error')
        })
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton 
                onClick={handleNavigate}
                size='large'
                edge='start'
                color='white'
                aria-label='home'
                sx={{ mr: 2 }}> 
                    <LogoIcon />
                </IconButton>
                <Typography variant='subtitle1'
                sx={{ flexGrow: 1 }}>
                    HobbyMate
                </Typography>
                <Button color='inherit'
                onClick={handleLogOut}>
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
