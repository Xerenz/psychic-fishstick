import React, {useEffect, useState} from 'react'
import { Box, Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import Authenticate from '../components/Authenticate'
import { Navbar } from '../components/Navbar';
import { HobbyCard } from '../components/HobbyCard';
import Loader from '../components/Loader';
import { authAxios, hobbyUrl } from '../api';

export default function Dashboard() {
    const [myHobbies, setMyHobbies] = useState([])
    const [noHobbies, setNoHobbies] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authAxios.get(hobbyUrl)
        .then((response) => {
            const { data } = response
            console.log(data)
            setMyHobbies(data)
        })
        .catch((error) => {
            console.log('Error', error)
        })
    }, [])

  return (
    <Authenticate>
        <Navbar />
        <Container sx={{ mx: 3 }}>
            {loading ? <Loader /> : 
            <>
                <Grid sx={{ my: 2 }}>
                    <Typography component='h1' variant='h5'>
                        My Activities
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={10}>
                        Event history
                    </Grid>
                    <Grid item>
                        Add new event
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 1 }} spacing={6}>
                    {myHobbies.map((hobby) => <HobbyCard hobby={hobby} key={hobby.id} />)}
                </Grid>
            </>
            }
        </Container>
    </Authenticate>
  )
}
