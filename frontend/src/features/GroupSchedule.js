import { Typography } from '@mui/material'
import React from 'react'
import ScheduleSelector from 'react-schedule-selector'

// palette: {
//     primary: {
//       main: '#6253FA',
//       light: '#BCB1FF'
//     },
//     secondary: {
//       main: '#FFC670',
//       light: '#EDEBDC',
//       dark: '#A9A3A3'
//     }
//   }

export default function GroupSchedule() {
  return (
    <>
        <Typography align='center' variant='h5'>
            Group's availability
        </Typography>
        <br />
        <ScheduleSelector 
        minTime={6}
        maxTime={24}
        unselectedColor='#EDEBDC'
        selectedColor='#FFC670'
        hoveredColor='#A9A3A3' />
    </>
  )
}
