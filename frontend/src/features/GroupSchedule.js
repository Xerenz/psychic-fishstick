import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import ScheduleSelector from 'react-schedule-selector'
import { authAxios, scheduleUrl } from '../api'

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

export default function GroupSchedule(props) {
  const [groupSchedule, setGroupSchedule] = useState([])
  
  const extractTimeData = (data) => {
    return data.map(item => item.time_block)
  }

  useEffect(() => {
    authAxios.get(`${scheduleUrl}${props.hobbyId}/group`)
    .then((response) => {
      const { data } = response
      const timeData = extractTimeData(data)
      setGroupSchedule(timeData)
    })
    .catch((error) => {
      console.log('Error', error)
    })
    .finally(() => {

    })
  }, [])

  return (
    <>
        <Typography align='center' variant='h5'>
            Group's availability
        </Typography>
        <br />
        <ScheduleSelector 
        selection={groupSchedule}
        minTime={6}
        maxTime={24}
        unselectedColor='#EDEBDC'
        selectedColor='#FFC670'
        hoveredColor='#A9A3A3' />
    </>
  )
}
