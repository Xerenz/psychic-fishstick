import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/system';
import Authenticate from '../components/Authenticate'
import { Navbar } from '../components/Navbar';
import Hobbies from '../components/Hobbies';
import Create from '../components/Create';
import Schedule from '../components/Schedule';
import Invite from '../components/Invite';

export default function Dashboard() {
  return (
    <Authenticate>
        <Navbar />
        <Container>
            <Routes>
                <Route path='' 
                element={<Hobbies />} />
                <Route path='create-event'
                element={<Create />} />
                <Route path='schedule/:id'
                element={<Schedule />} />
                <Route path='invite/:id'
                element={<Invite />} />
            </Routes>
        </Container>
    </Authenticate>
  )
}
