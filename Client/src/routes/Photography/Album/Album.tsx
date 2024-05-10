import styles from './Album.module.css';
import React, { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const CollectionCard = React.lazy(() => import('../../../components/CollectionCard'));
import Box from '@mui/material/Box';

import CircularProgress from '@mui/material/CircularProgress';

import { Collection } from '../../../types/interfaces';
import serverUrl from '../../../utils/APIUrl';
interface AlbumProps {
    // Define the props for the Album component here
}

const Album: React.FC<AlbumProps> = () => {
    // Get the id from the URL
    const { albumId } = useParams<{ id: string }>();
    // console.log(albumId);
    
    const [collections, setCollections] = React.useState([]);
    const [album, setAlbum] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [albumLoading, setAlbumLoading] = React.useState(true);
    useEffect(() => {
        // Fetch Collections from  server usinx axios in a async function
        const fetchCollections = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/collections`);                
                setCollections(response.data.data.collections);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCollections();
    }, []);

    // Fecth album data from the server
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/albums/${albumId}`);
                console.log(response.data.data.album);

                setAlbum(response.data.data.album);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAlbum();
    }, [albumId]);
        
    useEffect(() => {
        if (collections.length > 0) {
            setLoading(false);
        }
    }, [collections]);

    useEffect(() => {
        if (album !== undefined) {
            setAlbumLoading(false);
        }
    }, [album]);

    // Define the Album component here
    return (
    // display the albums here
    <>
        {
            albumLoading ? 
            (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
            ) : (
            <div className={styles.container}>
                    <div className={styles.albumCover}>
                        <img src={album.albumCover} alt="" />
                        <div className={styles.shadowOverlay}></div>
                    </div>
                    <div className={styles.infoContainer}>
                    <h1>{album.name}</h1>
                    <p>{album.description}</p>
                    </div>
                <div className={styles.collectionContainer}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div className={styles.container}>
                            {collections.map((collection: Collection) => (
                                <CollectionCard collection={collection} />
                            ))}
                        </div>
                    )}
                </div>
            </div>)
        }
    </>
);
};

export default Album;
