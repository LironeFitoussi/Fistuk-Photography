import styles from './Collection.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import of MUI components
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// import ImagesGrid from '../../../components/ImagesGrid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import ImageModal from '../../../components/ImageModal/ImageModal';
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
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    console.log(collection);
    
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
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!collection) {
        return <div>No collection found.</div>;
    }

    const openModal = (photo: Photo) => {
        setSelectedImage(photo);
    }

    function handleDownload(photo: Photo, event: React.MouseEvent<HTMLAnchorElement>) {
        // open photos.url in a new tab
        event.preventDefault();
        const url = photo.url;
        window
            .open(url, '_blank')
            ?.focus();
        
 
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerTextContainer}>
                <h2>{collection.name}</h2>
                
            </div>
                {/* {collection.images.map((photo) => (
                    <div key={photo._id}>
                        <img src={photo.url} alt={photo.name} />
                        <p>{photo.name}</p>
                        <a href={photo.url} download={photo.name} onClick={(e) => handleDownload(photo, e)}>
                            <span>Download</span>
                        </a>
                    </div>
                ))} */}
            {/* <ImagesGrid /> */}
            <ImageList sx={{ width: '90vw', height: '80%' }} variant="woven" cols={2} gap={8}>
                {collection.images.map((item) => (
                    <ImageListItem key={item.filename}>
                        <img
                            srcSet={`${item.url}`}
                            src={`${item.url}`}
                            alt={item.name}
                            loading="lazy"
                            onClick={() => openModal(item)}
                        />
                        {/* <a href={item.url} target='_blank'>Download</a> */}
                        {/* <a href={item.url} download={item.name} onClick={(e) => handleDownload(item, e)}>
                            <span>Download</span>
                        </a> */}
                    </ImageListItem>
                ))}
                
            </ImageList>
            {
                selectedImage && (
                    <ImageModal
                        open={true}
                        onClose={() => setSelectedImage(null)}
                        image={selectedImage}
                        download={() => handleDownload(selectedImage, new Event('click'))}
                    />
                )
            }
        </div>
    );
};

export default CollectionComponent;
