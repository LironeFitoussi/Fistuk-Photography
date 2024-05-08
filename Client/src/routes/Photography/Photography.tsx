import { Outlet } from 'react-router-dom';
import styles from './Photography.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import AlbumTable from '../../components/AlbumTable';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import { Collection } from '../../types/interfaces';
import { Album } from '../../types/interfaces';
import serverUrl from '../../utils/APIUrl';

const Photography = () => {
    const [activeLink, setActiveLink] = useState('albums');
    const [collections, setCollections] = useState([]);
    const [albums, setAlbums] = useState([]);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    // Fetch collections names from Server 
    useEffect(() => {
        // Fetch collections in async function
        const collections = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/collections`);
                // console.log(response.data.data.collections);
                setCollections(response.data.data.collections);
            } catch (error) {
                console.error(error);
            }
        };
        collections();
    }
    , []);

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
    }, []);

    return (
        <div className={styles.container}>
            {/* <ul className={styles.nav}>
                <li>
                    <button onClick={() => handleLinkClick('collections')}>Collections</button>
                </li>
                <li>
                    <button onClick={() => handleLinkClick('albums')}>Albums</button>
                </li>
            </ul> */}

            {activeLink === 'collections' && (
                <div>
                    {/* Renders a list of Collection names with link to /collections/:collectionId */}
                    <ul>
                        {collections.map((collection: Collection) => (
                            <li key={collection._id}>
                                <Link to={`/collections/${collection._id}`}>{collection.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeLink === 'albums' && (
                <div>
                    {/* Renders a list of Album names with link to /album/:albumId */}
                    {/* <ul>
                        {albums.map((album: any) => (
                            <li key={album._id}>
                                <Link to={`/albums/${album._id}`}>{album.name}</Link>    
                            </li>
                        ))}
                    </ul> */}
                    {/* <AlbumTable albums={albums} /> */}
                    {albums.map((album: Album) => (
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
