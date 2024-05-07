import styles from './Album.module.css';
import React, { useEffect } from 'react';
import axios from 'axios';
import CollectionCard from '../../../components/CollectionCard';
import { Collection } from '../../../types/interfaces';
interface AlbumProps {
    // Define the props for the Album component here
}

const Album: React.FC<AlbumProps> = () => {
    const [collections, setCollections] = React.useState([]);
    useEffect(() => {
        // Fetch Collections from  server usinx axios in a async function
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/collections');
                setCollections(response.data.data.collections);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCollections();
    }, []);

    // Define the Album component here
    return (
        // display the albums here
        <div className={styles.container}>
            {collections.map((collection: Collection) => (
                <CollectionCard collection={collection} />
            ))}
        </div>
    );
};

export default Album;
