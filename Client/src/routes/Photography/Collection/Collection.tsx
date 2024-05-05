import styles from './Collection.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Photo {
    _id: string;
    name: string;
    filename: string;
    collectionId: string;
    __v: number;
    url: string;
}

interface Collection {
    name: string;
    images: Photo[];
}

// interface CollectionParams {
//     collectionId: string;
// }

type URLType = string | boolean;

const CollectionComponent: React.FC = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const serverUrl: URLType = import.meta.env.VITE_SERVER_URL || false;

    useEffect(() => {
        if(serverUrl === false) {
            throw new Error('Server URL not set');
        }
        const url = `${serverUrl}/collections/${collectionId}`;
        
        axios.get(url)
            .then(response => {
                setCollection(response.data.data.collection);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching collection', error);
                setError('Failed to fetch collection');
                setLoading(false);
            });
    }, [collectionId, serverUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!collection) {
        return <div>No collection found.</div>;
    }

    function handleDownload(photo: Photo, event: Event) {
        event.preventDefault(); // Prevent default anchor behavior

        fetch(photo.url, {
            method: 'GET',
            headers: new Headers({
                'Origin': location.origin
            }),
            mode: 'no-cors'
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = photo.name || 'download';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((err: Error) => {
            console.error('Failed to fetch image');
            console.log(err.message);
        });
    }

    return (
        <div>
            <h2>{collection.name}</h2>
            <ul className={styles.photoList}>
                {collection.images.map((photo) => (
                    <li key={photo._id}>
                        <img src={photo.url} alt={photo.name} />
                        <p>{photo.name}</p>
                        <a href={photo.url} download={photo.name} onClick={(e) => handleDownload(photo, e)}>
                            <span>Download</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CollectionComponent;
