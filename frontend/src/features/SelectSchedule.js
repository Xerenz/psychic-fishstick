import React, {useState} from 'react'
import ScheduleSelector from 'react-schedule-selector'
import { Button, Grid, Typography } from '@mui/material'

export default function SelectSchedule() {
    const [selection, setSelection] = useState([])

    const handleChange = (newSelection) => {
        console.log(newSelection)
        setSelection(() => newSelection)
        console.log(selection)
    }

    return (
        <>
            <Typography align='center' variant='h5'>
                Your availability
            </Typography>
            <br />
            <ScheduleSelector
            selection={selection}
            onChange={handleChange}
            minTime={6}
            maxTime={24}
            unselectedColor='#BCB1FF'
            selectedColor='#6253FA' />
        </>
    )
}
