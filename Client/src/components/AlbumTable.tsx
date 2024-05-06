import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  name: string;
  date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  collections: any[];
}[]

const AlbumTable: React.FC<AlbumTableProps> = ({ albums }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Updated At</TableCell>
            <TableCell align="right">Collections</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albums.map((album) => (
            <TableRow
              key={album.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {album.name}
              </TableCell>
              <TableCell align="right">{album.date}</TableCell>
              <TableCell align="right">{album.location}</TableCell>
              <TableCell align="right">{album.createdAt}</TableCell>
              <TableCell align="right">{album.updatedAt}</TableCell>
              <TableCell align="right">Num of Collections included{album.collections.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AlbumTable;