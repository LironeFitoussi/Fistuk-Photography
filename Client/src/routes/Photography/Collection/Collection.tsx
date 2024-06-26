import styles from './Collection.module.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageModal from '../../../components/ImageModal/ImageModal';

import serverUrl from '../../../utils/APIUrl';
import { Collection } from '../../../types/interfaces';
import { Photo } from '../../../types/interfaces';

const loadImage = async (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

const CollectionComponent: React.FC = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [loadedImages, setLoadedImages] = useState<(Photo[])>([]);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/collections/${collectionId}`);
                setCollection(response.data.data.collection);
            } catch (error) {
                console.error('Error fetching collection', error);
                setError('Failed to fetch collection');
                setLoading(false);
            }
        };

        fetchCollection();
    }, [collectionId]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const openModal = (photo: Photo) => {
        setSelectedImage(photo);
    };

    const downloadImage = async (filename: string) => {
        setDownloading(true);
        try {
            const fileName = filename
            const response = await axios.get(`${serverUrl}/api/v1/images/downloadImage/?fileName=${fileName}`, {
            responseType: 'blob', // Important for downloading binary data
        });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `LironeFitoussiPhotography_${fileName}`);
            document.body.appendChild(link);
            link.click();
            setDownloading(false);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleFullCollectionDownload = () => {
        window.open(collection?.googleDriveLink ?? '', '_blank');
    };

    // use effect to detect screen size change and update the state
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
       if (collection !== null) {
         const loadImages = async () => {
            const images = await Promise.all(
                collection.images.map(async (item) => {
                    const image = await loadImage(item.url);
                    return { ...item, image };
                })
            );
            setLoadedImages(images);
        };

        loadImages();
       }
    }, [collection]);

    useEffect(() => {
        if (loadedImages.length > 0) {
            setLoading(false);
        }
    }, [loadedImages]);
    
    return (
        <div className={styles.container}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <div>Error: {error}</div>
            ) : !collection ? (
                <div>No collection found.</div>
            ) : (
                <>
                    <h1 className={styles.title}>{collection.name}</h1>
                    <ImageList cols={
                        // check the screen width and set the number of columns accordingly
                        screenWidth > 1200 ? 5 : screenWidth > 800 ? 4 : 2
                    } gap={8}>
                        {loadedImages.map((item) => (
                            <ImageListItem key={item.filename}>
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    onClick={() => openModal(item)}
                                    onLoad={handleImageLoad}
                                    className={styles.image}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    {selectedImage && (
                        <ImageModal
                            open={true}
                            onClose={() => setSelectedImage(null)}
                            image={selectedImage}
                            download={() => downloadImage(selectedImage.filename)}
                            downloading={downloading}
                        />
                    )}
                    <button className={styles.driveBtn} onClick={handleFullCollectionDownload}>
                        Download Collection
                    </button>
                </>
            )}
        </div>
    );
};

export default CollectionComponent;
