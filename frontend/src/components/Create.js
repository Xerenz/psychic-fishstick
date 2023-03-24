import React from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const options = [
    {
        id: 1,
        name: 'Sports',
        image: '',
    },
    {
        id: 2,
        name: 'Reading',
        image: '',
    },
    {
        id: 3,
        name: 'Study',
        image: '',
    },
    {
        id: 4,
        name: 'Teatime',
        image: '',
    }
]

export default function Create() {
  return (
    <Grid container 
    sx={{
        marginTop: '2%'
    }}
    direction='column'>
        <Stack sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <Typography>
                What kind of hobbies would you like to schedule with your friends?
            </Typography>
            <Typography>
                Please chose one of them. You can manually enter if there is no option for you.
            </Typography>
        </Stack>
        <Grid>
            Items
        </Grid>
    </Grid>
  )
}
