import React from 'react';
import { Outlet } from 'react-router-dom';
const Admin: React.FC = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <Outlet />
        </div>
    );
};

export default Admin;
