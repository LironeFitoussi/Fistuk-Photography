import styles from './Album.module.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import AlbumTable from '../../../components/AlbumTable';
interface AlbumProps {
    // Define the props for the Album component here
}

const Album: React.FC<AlbumProps> = () => {
    const [albums, setAlbums] = React.useState([]);
    useEffect(() => {
        // Fetch Albums from  server usinx axios in a async function
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/albums');
                console.log(response.data.data.albums);

                // Set the state of the albums here
                setAlbums(response.data.data.albums);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAlbums();
    }, []);

    // Define the Album component here
    return (
        // display the albums here
        <div className={styles.container}>
            <h1>Albums</h1>
            <AlbumTable albums={albums} />
        </div>
    );
};

export default Album;
