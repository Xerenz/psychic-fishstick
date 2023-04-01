import React, { useState } from 'react'
import { Card, CardActionArea, CardContent, 
    CardMedia, Grid, Button } from '@mui/material'
import bbImage from '../assets/img-bb.png'
import cycleImage from '../assets/img-cycle.png'
import fbImage from '../assets/img-fb.png'
import langImage from '../assets/img-lang.png'
import otherImage from '../assets/img-other.png'
import readImage from '../assets/img-reading.png'
import runImage from '../assets/img-run.png'
import shuttleImage from '../assets/img-shuttle.png'
import teaImage from '../assets/img-tea.png'
import yogaImage from '../assets/img-yoga.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useSnackStore from '../store/SnackStore'

export default function SelectHobby(props) {
    const [selected, setSelected] = useState(-1)

    const { showSnackbar } = useSnackStore((state) => state)

    const handleNext = () => {
        if (selected === -1) {
            showSnackbar('Please select a hobby', 'warning')
        }
        else {
            props.setPage(1)
        }
    }

    const handleSelect = (hobby, id) => {
        props.setHobby(hobby)
        setSelected(id)
    }

    return (
        <>
            <Grid container
            spacing={5}
            sx={{
                marginTop: '5%',
                marginBottom: '20px',
                justifyContent: 'center'
            }}>
                { data.map((item) => 
                    <HobbySelectionCard 
                    key={item.id}
                    selected={selected}
                    handleSelect={handleSelect}
                    {...item} /> ) }
            </Grid>
            <Grid container
            sx={{ 
                my: 2,
                justifyContent: 'center' 
            }}
            spacing={3}>
                <Grid item>
                    <Button variant='contained'
                    color='secondary'
                    onClick={handleNext}>
                            Next
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

const HobbySelectionCard = (props) => {
    const handleClick = () => {
        props.handleSelect(props.name, props.id)
    }

    return (
        <Grid item>
            <Card 
            sx={{
                minWidth: 170
            }}
            onClick={handleClick}>
                { props.selected === props.id ? <CheckCircleIcon /> : <br /> }
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                    component='img'
                    image={props.path} />
                    <CardContent sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        { props.name }
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

const data = [
    {
        id: 1,
        path: bbImage,
        name: 'Basketball'
    },
    {
        id: 2,
        path: cycleImage,
        name: 'Cycling'
    },
    {
        id: 3,
        path: fbImage,
        name: 'Football'
    },
    {
        id: 4,
        path: langImage,
        name: 'Language'
    },
    {
        id: 5,
        path: readImage,
        name: 'Reading'
    },
    {
        id: 6, 
        path: runImage,
        name: 'Running'
    },
    {
        id: 7,
        path: shuttleImage,
        name: 'Badminton'
    },
    {
        id: 8,
        path: teaImage,
        name: 'Teatime'
    },
    {
        id: 9,
        path: yogaImage,
        name: 'Yoga'
    },
    {
        id: 10,
        path: otherImage,
        name: 'Other'
    },
]
