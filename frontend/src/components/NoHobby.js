import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import emptyImage from '../assets/empty.png'

export default function NoHobby() {
  return (
    <Grid container
    direction='column'
    sx={{ 
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Grid item>
            <img src={emptyImage} 
            height={300} 
            width={450} />
        </Grid>
        <Grid item>
            <Typography variant='h6'>
                No events yet? Create new event&nbsp;
                <Link to='create-event'>
                    here
                </Link>
            </Typography>
        </Grid>
    </Grid>
  )
}
