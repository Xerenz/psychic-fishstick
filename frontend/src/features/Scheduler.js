import React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import SelectSchedule from './SelectSchedule'
import GroupSchedule from './GroupSchedule'
import Loader from '../components/Loader'

export default function Scheduler() {
  return (
    <Loader>
        <Grid container spacing={5}>
            <Grid item md={6}>
                <SelectSchedule />
            </Grid>
            <Grid item md={6}>
                <GroupSchedule />
            </Grid>
        </Grid>
        <Grid container
        sx={{ 
            my: 2,
            justifyContent: 'center' 
        }}
        spacing={3}>
            <Grid item>
                <Button variant='contained'
                color='secondary'>
                    Submit
                </Button>
            </Grid>
            <Grid item>
                <Button variant='contained'
                color='secondary'>
                    Skip
                </Button>
            </Grid>
        </Grid>
    </Loader>
  )
}
