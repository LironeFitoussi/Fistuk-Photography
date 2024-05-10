import React from 'react';
import { Outlet } from 'react-router-dom';
const Navbar = React.lazy(() => import('../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));
const Root: React.FC = () => {
  
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Root;