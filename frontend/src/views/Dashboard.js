import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import { Container } from '@mui/system';
import Authenticate from '../components/Authenticate'
import { Navbar } from '../components/Navbar';
import Hobbies from '../components/Hobbies';
import Create from '../components/Create';

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
            </Routes>
        </Container>
    </Authenticate>
  )
}
