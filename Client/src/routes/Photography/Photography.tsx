import { Outlet } from 'react-router-dom';
import styles from './Photography.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import AlbumTable from '../../components/AlbumTable';
const AlbumCard = React.lazy(() => import('../../components/AlbumCard/AlbumCard'));

// import { Collection } from '../../types/interfaces';
import { Album } from '../../types/interfaces';
import serverUrl from '../../utils/APIUrl';

const Photography = () => {
    // const [activeLink, setActiveLink] = useState('albums');
    // const [collections, setCollections] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    // const handleLinkClick = (link: string) => {
    //     setActiveLink(link);
    // };

    // Fetch collections names from Server 
    // useEffect(() => {
    //     Fetch collections in async function
    //     const collections = async () => {
    //         try {
    //             const response = await axios.get(`${serverUrl}/api/v1/collections`);
    //             console.log(response.data.data.collections);
    //             setCollections(response.data.data.collections);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     collections();
    // }
    // , []);

    // Fetch Albums names from Server
    useEffect(() => {
        // Fetch Albums in async function
        const albums = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/albums`);
                // console.log(response.data.data.albums);
                setAlbums(response.data.data.albums);
            } catch (error) {
                console.error(error);
            }
        };
        albums();
        setLoading(false);
    }, []);

    return (
        <div className={styles.container}>
            { (
                <div>
                    {loading && albums.map((album: Album) => (
                        <Link to={`/albums/${album._id}`} key={album._id}>
                            <AlbumCard album={album} />
                        </Link>
                    ))}

                </div>
            )}
            <Outlet />
        </div>
    );
};

export default Photography;
