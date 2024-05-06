import { Outlet } from 'react-router-dom';
import styles from './Photography.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Collection {
    date: string;
    description: string;
    images: string[]; // Define a more specific type instead of 'any' if the image structure is known
    location: string;
    name: string;
    __v: number;
    _id: string;
}

const Photography = () => {
    const [activeLink, setActiveLink] = useState('collections');
    const [collections, setCollections] = useState([]);
    // const [albums, setAlbums] = useState([]); // TODO: Fetch albums from server

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    // Fetch coleections names from Server 
    useEffect(() => {
        // Fetch collections in async function
        const collections = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/collections');
                console.log(response.data.data.collections);
                setCollections(response.data.data.collections);
            } catch (error) {
                console.error(error);
            }
        };
        collections();
    }
    , []);
    return (
        <div>
            <nav >
                <ul className={styles.nav}>
                    <li>
                        <button onClick={() => handleLinkClick('collections')}>Collections</button>
                    </li>
                    <li>
                        <button onClick={() => handleLinkClick('albums')}>Albums</button>
                    </li>
                </ul>
            </nav>

            {activeLink === 'collections' && (
                <div>
                    <p>dfsgsdgfsdg</p>
                    {/* Renders a list of Collection names with link to /collections/:collectionId */}
                    <ul>
                        {collections.map((collection: Collection) => (
                            <li key={collection._id}>
                                <a href={`/photography/collections/${collection._id}`}>{collection.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeLink === 'albums' && (
                <div>
                    <p>sdfgsdfgsdfg</p>
                    {/* Render albums */}
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default Photography;
