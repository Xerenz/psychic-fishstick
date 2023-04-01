import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {ReactComponent as LocationIcon} from '../assets/Location.svg'
import {ReactComponent as Person} from '../assets/Person.svg'
import {ReactComponent as Calendar} from '../assets/Calendar.svg'
import { authAxios, hobbyUrl } from '../api';
import useSnackStore from '../store/SnackStore';

export const HobbyCard = ({ hobby, handleHobbiesUpdate }) => {
    let navigate = useNavigate()
    const { showSnackbar } = useSnackStore((state) => state)

    const handleClick = () => {
        navigate(`schedule/${hobby.id}`)
    }

    const handleQuit = () => {
        authAxios.get(`${hobbyUrl}${hobby.id}/quit/`)
        .then((response) => {
            if (!hobby.created_by_me) {
                handleHobbiesUpdate(
                    (data, setData) => {
                        setData(data.filter((item) => item.id !== hobby.id))
                    }
                )
            }
            showSnackbar(`You have exited out of ${hobby.name}`, 'warning')
        })
        .catch((error) => {
            const message = error.response?.data?.detail
            showSnackbar(message | 'Something went wrong',
            'error')
        })
        .finally(() => {

        })
    }

    const handleDownloadIcs = () => {

    }

    return (
        <Grid item>
            {console.log(hobby)}
            <Card sx={{ 
                minWidth: 325,
                backgroundColor: '#F6F5F8',
                borderRadius: '20px'
            }}>
                <CardContent>
                    <Grid row sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 1
                    }}>
                        { hobby.created_by_me ?
                        <Tooltip title='Created by me'>
                            <StarRoundedIcon />
                        </Tooltip> :
                        <div></div> }
                        <IconButton onClick={handleQuit} >
                            <Tooltip title='Quit'>
                                <CloseIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                    <Grid variant='button' 
                    onClick={handleClick}
                    sx={{
                        cursor: 'pointer'
                    }}>
                        <Typography variant="h5" component="div"
                        color='primary'>
                                {hobby.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="primary.light">
                            <LocationIcon styles={{
                                height: '10px',
                                width: '15px'
                            }} />&nbsp;{hobby.location}
                        </Typography>
                        <Typography variant="body2">
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Person />
                                &nbsp;Participants: 
                                &nbsp;{hobby.number_of_participants}/{hobby.max_number_of_participants}
                            </Grid>
                        </Typography>
                        <Typography variant='body2'>
                            <Grid sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Calendar />
                                &nbsp;{formatDuration(hobby.duration)} hrs
                            </Grid>
                        </Typography>
                    </Grid>
                    <Grid sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <IconButton onClick={handleDownloadIcs}>
                            <Tooltip title='Download ics'>
                                <RssFeedIcon  />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

function formatDuration(value) {
    let n = value.length
    return value.substring(3, n)
}
