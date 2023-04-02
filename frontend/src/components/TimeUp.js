import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Chip, FormControlLabel, FormGroup, Grid, Tooltip, Typography } from '@mui/material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CelebrationIcon from '@mui/icons-material/Celebration';
import useSnackStore from '../store/SnackStore';
import { authAxios, pollUrl, scheduleUrl } from '../api';

const formatDateTimeString = (datetime) => {
    let dt = new Date(datetime)
    return `${dt.toDateString()}, ${dt.toLocaleTimeString()}` 
}

export default function TimeUp(props) {
    if (props.validMeeting) {
        return (
          <Grid>
            <Typography variant='h4'>
                <Grid sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: '10px'
                }}>
                    <CelebrationIcon fontSize='large' sx={{ mr: '5px'}} />
                    Your hobby is all set and scheduled!
                </Grid>
            </Typography>
            <Typography variant='h6'>
                <Grid sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: '10px'
                }}>
                    <EventAvailableIcon sx={{ mr: '5px'}} /> 
                    { formatDateTimeString(props.finalDateTime) }
                </Grid>
            </Typography>
          </Grid>
        )
    }

    return (
        <Poll hobbyId={props.hobbyId}
        numParticipants={props.numParticipants} />
    )
}

const Poll = (props) => {
    const [checkboxes, setCheckboxes] = useState([])
    const [selected, setSelected] = useState(-1)

    const { showSnackbar } = useSnackStore((state) => state)

    const navigate = useNavigate()

    const formatRatio = (ratio) => {
        return `${ratio * 100}%`
    }

    const handleCheck = (id) => {
        setSelected(id)
    }

    const handleSubmit = () => {
        authAxios.get(`${pollUrl}${selected}/poll`)
        .then((response) => {
            showSnackbar('Your vote has been submitted', 'success')
            navigate('/dashboard')
        })
        .catch((error) => {
            const message = error?.response?.data?.detail
            showSnackbar(message | 'Something went wrong',
            'error')
        })
        .finally(() => {

        })
    }
    
    useEffect(() => {
        if (!props.hobbyId) {
            return () => {}
        }
        
        authAxios.get(`${scheduleUrl}${props.hobbyId}/poll`)
        .then((response) => {
            const { data } = response
            setCheckboxes(data)
        })
        .catch((error) => {
            const message = error?.response?.data?.detail
            showSnackbar(message | 'Something went wrong',
            'error')
        })
        .finally(() => {

        })
    }, [])

    return (
        <Grid>
            <Typography variant='h6' color='primary'>
                Please vote and finalize meeting
            </Typography>
            <FormGroup>
                { checkboxes.map((cb) => {
                        const label = formatDateTimeString(cb.time_block)
                        return (
                            <Grid>
                                <FormControlLabel 
                                key={cb.id} 
                                control={<Checkbox 
                                    onChange={() => handleCheck(cb.id)} />} 
                                label={label} />
                                <Tooltip title='Current votes'>
                                    <Chip label={`${cb.votes}/${props.numParticipants}`}
                                    color='secondary'
                                    variant='contained' />
                                </Tooltip>
                                {/* <Tooltip title='Previous votes ratio'>
                                    <Chip sx={{
                                        mx: 1
                                    }}
                                    label={formatRatio(cb.prev_votes_ratio)}
                                    color='secondary'
                                    variant='contained' />
                                </Tooltip> */}
                            </Grid>
                        )
                    }
                ) }
            </FormGroup>
            <br />
            <Button variant='contained' 
            color='secondary'
            onClick={handleSubmit}>
                Submit
            </Button>
        </Grid>
    )
}
