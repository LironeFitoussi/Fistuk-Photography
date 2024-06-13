import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Admin: React.FC = () => {
    const { isAuthenticated, user } = useAuth0();

    return (
        <>
           { (isAuthenticated && user?.nickname === "LironeFitoussi") ? <Outlet /> : <h1>Access Denied</h1>} 
        </>
    );
};

export default Admin;
