import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';

export const HobbyCard = ({ hobby }) => (
    <Grid item>
        <Card sx={{ minWidth: 325 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {hobby.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {hobby.location}
                </Typography>
                <Typography variant="body2">
                    Max participants: 5
                    <br />
                    {hobby.duration}
                    <br />
                    Activity: {hobby.activity}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
)