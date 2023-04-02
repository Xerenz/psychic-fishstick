import React from 'react'
import Button from '@mui/material/Button'
import useSnackStore from '../store/SnackStore'
import { authAxios, scheduleUrl } from '../api'

export default function SubmitSchedule(props) {
    const {showSnackbar} = useSnackStore((state) => state)

    const formatData = (data) => {
        return data.map((item) => ({
            time_block: item,
        }))
    }

    const handleClick = () => {
        const data = formatData(props.schedule)
        
        authAxios.post(`${scheduleUrl}${props.hobbyId}/create`, data)
        .then((response) => {
            showSnackbar('Thanks for updating your schedule!',
            'success')
        })
        .catch((error) => {
            const message = error.response?.data?.detail
            showSnackbar(message | 'Something went wrong',
            'error')
        })
        .finally(() => {

        })
    }
    
    return (
        <Button variant='contained'
        color='secondary'
        onClick={handleClick}>
            Submit
        </Button>
    )
}
