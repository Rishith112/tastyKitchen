import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const ProtectedRouting = ({ children }: {children : React.ReactNode}) => {
    const jwt = Cookies.get('jwt_token');
    if (!jwt) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRouting;
