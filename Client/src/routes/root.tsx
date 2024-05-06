import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
const Root: React.FC = () => {
  
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '80vh',
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