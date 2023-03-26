import React from 'react'
import Grid from '@mui/material/Grid'
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
    </Loader>
  )
}
