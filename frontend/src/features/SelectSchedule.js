import React, { useEffect } from 'react'
import ScheduleSelector from 'react-schedule-selector'
import { Button, Grid, Typography } from '@mui/material'
import { authAxios, scheduleUrl } from '../api'

export default function SelectSchedule(props) {
    const extractTimeData = (data) => {
        return data.map(item => item.time_block)
    }

    useEffect(() => {
        authAxios.get(`${scheduleUrl}${props.hobbyId}/my`)
        .then((response) => {
            const { data } = response
            const timeData = extractTimeData(data)
            console.log(timeData)
            props.setSchedule(timeData)
        })
        .catch((error) => {
            console.log('Error', error)
        })
        .finally(() => {

        })
    }, [])

    const handleChange = (newSelection) => {
        props.setSchedule(() => newSelection)
    }

    return (
        <>
            <Typography align='center' variant='h5'>
                Your availability
            </Typography>
            <br />
            <ScheduleSelector
            selection={props.schedule}
            onChange={handleChange}
            minTime={6}
            maxTime={24}
            unselectedColor='#BCB1FF'
            selectedColor='#6253FA' />
        </>
    )
}
