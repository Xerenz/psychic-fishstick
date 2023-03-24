import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'
import useSnackStore from '../store/SnackStore'
import { authAxios, hobbyUrl } from '../api';

export default function Create() {
    let navigate = useNavigate()
    const {showSnackbar} = useSnackStore((state) => state)

    const [errorText, setErrorText] = useState('')
    const [error, setError] = useState(false)
    const [durationErrorText, setDurationErrorText] = useState('')
    const [durationError, setDurationError] = useState(false)
    
    const isNumOfParticipantsValid = (value) => {
        if (value < 2) {
            setErrorText('Minimum number of participants should be 2')
            setError(true)
            return false
        }
        else if (value > 30) {
            setErrorText('Maximum number of participants should be 30')
            setError(true)
            return false
        }
        return true
    }

    const formatDuration = (value) => {
        let hh = 0
        let mm = 0

        hh = Math.floor(value / 60)
        mm = value % 60
        
        return `${hh}:${mm}`
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const value = formData.get('max_number_of_participants')
        if (!isNumOfParticipantsValid(value)) {
            return false
        }

        let data = Object.fromEntries(formData)

        data['duration'] = formatDuration(data['duration'])

        console.log(data)

        authAxios.post(hobbyUrl, data)
        .then((response) => {
            const {data} = response
            showSnackbar('Your new event has been created!', 
            'success')
            navigate(`/dashboard/schedule/${data.id}`)
        })
        .catch((error) => {
            console.log('Error', error)
            const message = error.response?.data?.detail
            showSnackbar(message | 'Something went wrong', 
            'error')
        })
    }

  return (
    <Grid container 
    sx={{
        marginTop: '2%'
    }}
    direction='column'>
        <Grid sx={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Typography variant='h4' color='primary'>
                Let's create a new event!
            </Typography>
        </Grid>
        <Box component='form' onSubmit={handleSubmit}
        sx={{ 
            mx: 2,
            marginTop: '5%' 
        }}>
            <Grid container
            direction={'column'}
            spacing={7}
            sx={{
                marginX: '10%'
            }}>
                <Grid item>
                    <FormControl required>
                        <FormLabel>
                            What's the title of the event?
                        </FormLabel>
                        <TextField variant='standard' name='name' />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl required>
                        <FormLabel>
                            What kind of event is it?
                        </FormLabel>
                        <RadioGroup name='activity' row>
                            <FormControlLabel value="Sports"
                            label="Sports" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <FormControlLabel value="Study" 
                            label="Study" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <FormControlLabel value="Reading" 
                            label="Reading" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <RadioButtonWithTextInput 
                            label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl required>
                        <FormLabel>
                            Select duration
                        </FormLabel>
                        <RadioGroup name='duration' row>
                            <FormControlLabel value={30}
                            label="30 mins" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <FormControlLabel value={60}
                            label="60 mins" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <FormControlLabel value={90}
                            label="90 mins" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <RadioButtonWithTextInput 
                            label="Add duration in mins"
                            error={durationError}
                            errorText={durationErrorText}
                            type='number' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl required>
                        <FormLabel>
                            Number of participants
                        </FormLabel>
                        <Typography variant='caption'>
                            Maximum 30 participants
                        </Typography>
                        <TextField variant='standard' 
                        name='max_number_of_participants'
                        type='number'
                        error={error}
                        helperText={errorText} />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl required>
                        <FormLabel>
                            Where are you planning to meet?
                        </FormLabel>
                        <TextField variant='standard' name='location' />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <Button variant='contained' color='secondary'
                        type='submit'>
                            Next
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
            <br />
        </Box>
    </Grid>
  )
}

const RadioButtonWithTextInput = (props) => {
    const [value, setValue] = useState("")
    
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <FormControlLabel value={value} control={<Radio />} />
            <TextField label={props.label} variant='standard'
            onChange={handleChange}
            error={props.error}
            helperText={props.errorText}
            type={props.type} />
        </Box>
    )
}

