import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  
  return (
    <>
        <div className="container">
          <div className="parent">
            <div className="my-column-1">
              <div>
                <Typography color='white'
                variant='h4' sx={{
                  marginX: 5
                }}>
                  Schedule your hobby-sharing
                  event with your friends
                </Typography>
                <Typography color='white'
                sx={{
                  marginX: 5
                }}>
                  Our web-based application help you find
                  overlapping free time with you friends and schedule activities you
                  all love.
                </Typography>
              </div>
            </div>
            <div className="my-column-2">
              <Typography variant='h4' 
              align='center'
              color='primary'
              sx={{
                mb: 2
              }}>
                How it works
              </Typography>
              <Typography variant='h6'
              color='primary'>
                HobbyMate makes it simple to schedule 
              </Typography>
              <Typography variant='h6'
              color='primary'>
                activities by comparing everyone's 
              </Typography>
              <Typography variant='h6'
              color='primary'>
                availability and listing all
                available times
              </Typography>
              <Button variant='contained' 
              color='secondary'
              sx={{
                my: 5
              }}
              onClick={() => navigate('/login')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
    </>
  )
}