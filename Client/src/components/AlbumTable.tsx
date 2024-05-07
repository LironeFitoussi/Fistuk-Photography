import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dateFormat, { masks } from "dateformat";
import { Link } from 'react-router-dom';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

interface AlbumTableProps {
  albums: Albums;
}

type Albums = {
  _id: string;
  name: string;
  date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  collections: any[];
}[]

const AlbumTable: React.FC<AlbumTableProps> = ({ albums }) => {


  // state to hold type of screen
  const [screenType, setScreenType] = React.useState('desktop');

  // function to handle screen size change
  const handleScreenSizeChange = () => {
    if (window.innerWidth < 768) {
      setScreenType('mobile');
    } else {
      setScreenType('desktop');
    }
  };


  // set screen type on component mount
  useEffect(() => {
    handleScreenSizeChange();
    window.addEventListener('resize', handleScreenSizeChange);
    return () => {
      window.removeEventListener('resize', handleScreenSizeChange);
    };
  }, []);



  return (
    <TableContainer component={Paper} sx={{
      width: '100%'
    }}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            {
              screenType === 'desktop' && (
                <>

                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Created At</TableCell>
                  <TableCell align="right">Updated At</TableCell>
                  <TableCell align="right">Collections</TableCell>
                </>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {albums.map((album) => (
            <TableRow
              key={album.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={`/albums/${album._id}`}
                >
                  {album.name}
                </Link>
                
              </TableCell>
              <TableCell align="right">{dateFormat(album.date, masks['longDate'])}</TableCell>
              {
                screenType === 'desktop' && (
                  <>
                    
                    <TableCell align="right">{album.location}</TableCell>
                    <TableCell align="right">{album.createdAt}</TableCell>
                    <TableCell align="right">{album.updatedAt}</TableCell>
                    <TableCell align="right">Num of Collections included{album.collections.length}</TableCell>
                  </>
                )
              }
         </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AlbumTable;