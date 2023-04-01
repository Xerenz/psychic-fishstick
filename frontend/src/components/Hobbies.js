import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { HobbyCard } from './HobbyCard';
import Loader from './Loader';
import NoHobby from './NoHobby';
import useLoaderStore from '../store/LoaderStore';
import {ReactComponent as CreateNew} from '../assets/CreateNew.svg'
import {ReactComponent as EventHistory} from '../assets/EventHistory.svg'
import { authAxios, hobbyUrl } from '../api';

export default function Hobbies() {
    const [myHobbies, setMyHobbies] = useState([])
    const [noHobbies, setNoHobbies] = useState(false)
    const {hideLoader, showLoader} = useLoaderStore((state) => state)

    let navigate = useNavigate()

    const handleCreateNewClick = () => {
        navigate('create-event')
    }

    const handleHobbiesUpdate = (updateFunc) => {
       updateFunc(myHobbies, setMyHobbies)
    }

    useEffect(() => {
        showLoader()
    }, [])
   
    useEffect(() => {
        authAxios.get(hobbyUrl)
        .then((response) => {
            const { data } = response
            console.log(data)
            setMyHobbies(data)
            if (data.length === 0) {
                setNoHobbies(true)
            }
        })
        .catch((error) => {
            console.log('Error', error)
        })
        .finally(() => {
            hideLoader()
        })
    }, [])

  return (
    <Loader>
        {noHobbies ? 
        <NoHobby /> :
        <>
            <Grid sx={{ my: 2 }}>
                <Typography component='h1' 
                variant='h4' color='primary'>
                    My Activities
                </Typography>
            </Grid>
            <Grid container row>
                <Grid item
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: '70%'
                }}>
                    <EventHistory style={{
                        height: '30px',
                        width: '30px',
                    }} /> &nbsp;Event history
                </Grid>
                <Grid item
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <IconButton 
                    onClick={handleCreateNewClick}>
                        <CreateNew style={{
                            height: '30px',
                            width: '30px'
                        }} />
                    </IconButton>Add new event
                </Grid>
            </Grid>
            <Grid container
            sx={{ mt: 1 }}
            spacing={6}>
                { myHobbies.map((hobby) => 
                <HobbyCard hobby={hobby} 
                key={hobby.id} 
                handleHobbiesUpdate={handleHobbiesUpdate} />) }
            </Grid>
        </>
        }
    </Loader>
  )
}
