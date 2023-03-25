import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import {ReactComponent as LocationIcon} from '../assets/Location.svg'
import {ReactComponent as Person} from '../assets/Person.svg'
import {ReactComponent as Calendar} from '../assets/Calendar.svg'
import RssFeed from '@mui/icons-material/RssFeed';

export const HobbyCard = ({ hobby }) => {
    return (
        <Grid item>
            {console.log(hobby)}
            <Card sx={{ 
                minWidth: 325,
                backgroundColor: '#F6F5F8',
                borderRadius: '20px'
            }}>
                <CardContent>
                    <IconButton sx={{
                        marginLeft: '90%'
                    }}>
                        <Tooltip title='Quit'>
                            <CloseIcon />
                        </Tooltip>
                    </IconButton>
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
                    <IconButton sx={{
                        marginLeft: '90%'
                    }}>
                        <Tooltip title='Download ics'>
                            <RssFeedIcon  />
                        </Tooltip>
                    </IconButton>
                </CardContent>
            </Card>
        </Grid>
    )
}

function formatDuration(value) {
    let n = value.length
    return value.substring(3, n)
}
