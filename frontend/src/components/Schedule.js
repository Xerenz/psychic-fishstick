import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Loader from './Loader'
import useSnackStore from '../store/SnackStore'
import useLoaderStore from '../store/LoaderStore'
import Scheduler from '../features/Scheduler'
import {ReactComponent as Person} from '../assets/Person.svg'
import {ReactComponent as LocationIcon} from '../assets/Location.svg'
import { authAxios, hobbyUrl } from '../api'
import LinkDialog from './LinkDialog'

export default function Schedule() {
    const {id} = useParams()
    const {hideLoader} = useLoaderStore((state) => state)
    const {showSnackbar} = useSnackStore((state) => state)

    const [hobby, setHobby] = useState({})

    const [modalOpen, setModalOpen] = useState(false)

    const handleSubmit = () => {
        
    }

    const handleSkip = () => {
        
    }

    const createShareableLink = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    useEffect(() => {
        authAxios.get(`${hobbyUrl}${id}/`)
        .then((response) => {
            const {data} = response
            console.log(data)
            setHobby(data)
        })
        .catch((error) => {
            const message = error.response?.data?.detail
            showSnackbar(message | 'Something went wrong',
            'error')
        })
        .finally(() => hideLoader())
    }, [id, ])

    return (
        <Loader>
            <Grid sx={{ my: 2 }}>
                <Typography component='h1'
                variant='h4' color='primary'>
                    { hobby.name }
                </Typography>
                <Typography variant='h6'
                color='primary.light'>
                    <LocationIcon /> { hobby.location }
                </Typography>
                <Typography>
                    <Grid sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Person />
                        &nbsp;Participants:
                        &nbsp;{hobby.number_of_participants}/{hobby.max_number_of_participants}
                    </Grid>
                </Typography>
            </Grid>
            <Scheduler />
            <Grid container
            sx={{ 
                my: 2,
                justifyContent: 'center' 
            }}
            spacing={3}>
                <Grid item>
                    <Button variant='contained'
                    color='secondary'>
                        Submit
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained'
                    color='secondary'>
                        Skip
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained'
                    color='secondary'
                    onClick={createShareableLink}>
                        Share
                    </Button>
                </Grid>
            </Grid>
            <LinkDialog open={modalOpen}
            handleClose={closeModal} />
        </Loader>
    )
}
