import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material'

export default function Create() {
    const handleSubmit = (e) => {

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
        <Box component={'form'} 
        onSubmit={handleSubmit}
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
                        <TextField variant='standard' />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl required>
                        <FormLabel>
                            What kind of event is it?
                        </FormLabel>
                        <RadioGroup row>
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
                        <RadioGroup row>
                            <FormControlLabel value="30"
                            label="30 mins" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <FormControlLabel value="60" 
                            label="60 mins" control={<Radio />}
                            style={{
                                marginRight: '50px'
                            }} />
                            <FormControlLabel value="90" 
                            label="90 mins" control={<Radio />}
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
                            Where are you planning to meet?
                        </FormLabel>
                        <TextField variant='standard' />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <Button variant='contained' color='secondary'>
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
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <FormControlLabel value="" control={<Radio />} />
            <TextField label={props.label} variant='standard'/>
        </Box>
    )
}

