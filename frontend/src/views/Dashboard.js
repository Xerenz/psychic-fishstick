import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import { Container } from '@mui/system';
import Authenticate from '../components/Authenticate'
import { Navbar } from '../components/Navbar';
import Hobbies from '../components/Hobbies';

export default function Dashboard() {
  return (
    <Authenticate>
        <Navbar />
        <Container>
            <Routes>
                <Route path='/' 
                element={<Hobbies />} />
            </Routes>
        </Container>
    </Authenticate>
  )
}
