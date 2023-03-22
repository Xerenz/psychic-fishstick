import React from 'react'
import useAuthStore from '../store/AuthStore'
import Login from '../views/Login'

export default function Authenticate(props) {
    const {isAuthenticated} = useAuthStore((state) => state)

    if (isAuthenticated) {
        return (
            <div>{props.children}</div>
        )
    }

    return <Login />
}
