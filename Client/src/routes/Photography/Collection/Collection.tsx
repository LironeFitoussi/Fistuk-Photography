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
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    // console.log(selectedImage);
    // console.log(selectedFiles);
    
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

    useEffect(() => { 
        // console.log('Collection:', collection);
        if (collection) {
            const files = collection.images.map((image) => image.filename);
            // console.log('Selected files:', files);
            setSelectedFiles(files);
        }
    }, [collection]);

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


    const handleFullCollectionDownload = async () => {
        try {
            const response = await axios.post(`${serverUrl}/api/v1/compress`, { files: selectedFiles }, { responseType: 'blob' });
            const url = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'images.rar';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading RAR archive:', error);
        }
    };


    const downloadImageFromS3 = async () => {
        if (selectedImage === null) {
            return;
        } else {
            const params = {
                Bucket: import.meta.env.VITE_REACT_APP_AWS_BUCKET_NAME,
                Key: selectedImage.filename,
            };

            try {
                const data = await s3.getObject(params).promise();
                const url = URL.createObjectURL(new Blob([data.Body]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'LironeFitoussiPhotographer_' + selectedImage.filename ;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading image from S3:', error);
            }
        }
    };

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
                    download={() => downloadImageFromS3()}
                />
            )}

            {/* Button to download full collection */}
            <button onClick={() => {
                console.log('Download full collection')
                handleFullCollectionDownload();    
            }}>
                Download full collection
            </button>
        </div>
    );
};

export default CollectionComponent;
