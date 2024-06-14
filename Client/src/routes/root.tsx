import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import the Navbar component directly
import Footer from '../components/Footer/Footer';

const MemoizedNavbar = memo(Navbar); // Memoize the Navbar component

const Root: React.FC = () => {
  return (
    <>
      <MemoizedNavbar />
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
