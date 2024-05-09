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
import s3 from '../../../utils/AWS';
import { Collection } from '../../../types/interfaces';

interface Photo {
    _id: string;
    name: string;
    filename: string;
    collectionId: string;
    __v: number;
    url: string;
}

const CollectionComponent: React.FC = () => {
    const { collectionId } = useParams<{ collectionId: string }>();
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/collections/${collectionId}`);
                setCollection(response.data.data.collection);
                setLoading(false);
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

    const downloadImageFromS3 = async () => {
        try {
            const params = {
                Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
                Key: selectedImage!.filename,
            };
            const data = await s3.getObject(params).promise();
            const url = URL.createObjectURL(new Blob([data.Body]));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'LironeFitoussiPhotographer_' + selectedImage!.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image from S3:', error);
        }
    };

    const handleFullCollectionDownload = () => {
        window.location.href = collection?.googleDriveLink ?? '';
    };

    // use effect to detect screen size change and update the state
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
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
                        {collection.images.map((item) => (
                            <ImageListItem key={item.filename}>
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    onClick={() => openModal(item)}
                                    onLoad={handleImageLoad}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    {selectedImage && (
                        <ImageModal
                            open={true}
                            onClose={() => setSelectedImage(null)}
                            image={selectedImage}
                            download={downloadImageFromS3}
                        />
                    )}
                    <button className={styles.driveBtn} onClick={handleFullCollectionDownload}>
                        Download full collection
                    </button>
                </>
            )}
        </div>
    );
};

export default CollectionComponent;
