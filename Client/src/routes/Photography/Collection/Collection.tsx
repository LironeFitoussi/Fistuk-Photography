import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageModal from '../../../components/ImageModal/ImageModal';
import serverUrl from '../../../utils/APIUrl';

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

const CollectionComponent: React.FC = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState<Collection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
    
    useEffect(() => {
        axios.get(`${serverUrl}/api/v1/collections/${collectionId}`)
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

    const handleDownload = (photo: Photo) => {
        console.log('Downloading image');
        
        axios.get(photo.url, { responseType: 'blob' }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.download = photo.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    return (
        <div>
            <ImageList>
                {collection.images.map((item) => (
                    <ImageListItem key={item.filename}>
                        <img
                            src={item.url}
                            alt={item.name}
                            onClick={() => openModal(item)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            {selectedImage && (
                <ImageModal
                    open={true}
                    onClose={() => setSelectedImage(null)}
                    image={selectedImage}
                    download={() => handleDownload(selectedImage)}
                />
            )}
        </div>
    );
};

export default CollectionComponent;
