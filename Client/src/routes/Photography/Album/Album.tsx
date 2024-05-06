import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AlbumProps {
    // Define the props for the Album component here
}

const Album: React.FC<AlbumProps> = () => {
    // const [albums, setAlbums] = React.useState([]);
    // useEffect(() => {
    //     // Fetch Albums from  server usinx axios in a async function
    //     const fetchAlbums = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/api/v1/albums');
    //             console.log(response.data.data.albums);

    //             // Set the state of the albums here
    //             setAlbums(response.data.data.albums);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchAlbums();
    // }, []);

    // Define the Album component here
    return (
        // display the albums here
        <div>
            <h1>Albums</h1>
            <ul>
                {/* {albums.map((album: any) => (
                    <li key={album._id}>{album.title}</li>
                ))} */}
            </ul>
        </div>
    );
};

export default Album;
