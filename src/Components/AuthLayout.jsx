import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
    let loginuser = localStorage.getItem('user')
    return (
        loginuser ? <>{children}</> :
            <Navigate to='/login' />
    )
}

export default AuthLayout