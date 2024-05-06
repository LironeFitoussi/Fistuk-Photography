import styles from './Upload.module.css';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import axios from 'axios';

interface PostImageProps {
    images: File[];
    description: string;
}

interface ImageData {
    result: any;
    image: string;
    description: string;
}

interface ApiResponse {
    results: ImageData[];
}

interface Collection {
    date: string;
    description: string;
    images: string[];
    location: string;
    name: string;
    __v: number;
    _id: string;
}

function PostImage() {
    const [files, setFiles] = useState<File[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [dragging, setDragging] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [collections, setCollections] = useState<Collection[]>([]);

    const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (files.length === 0) return;

        setUploading(true);
        setError("");
        setUploadSuccess(false);
        try {
            const result = await uploadImages({ images: files, description });
            console.log(result);
            setUploadSuccess(true);
            setFiles([]);
            setFileNames([]);
        } catch (error) {
            console.error("Upload failed", error);
            setError("Failed to upload images.");
        } finally {
            setUploading(false);
        }
    };

    const filesSelected = (event: ChangeEvent<HTMLInputElement>): void => {
        const fileList = event.target.files;
        if (fileList) {
            setFiles(Array.from(fileList));
            setFileNames(Array.from(fileList).map(file => file.name));
        }
    };

    async function uploadImages({ images, description }: PostImageProps): Promise<ImageData[]> {
        const formData = new FormData();
        images.forEach(image => formData.append('image', image));
        formData.append("description", description);

        try {
            const result = await axios.post<ApiResponse>('http://localhost:3000/api/v1/images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return result.data.results;
        } catch (error: any) {
            console.error("Failed to upload images", error.response.data);
            throw error.response.data.message;
        }
    }

    // Fetch list of Exisitng Colleciton using axios async/await and hold the data in collections state
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/collections');
                setCollections(response.data.data.collections);
            } catch (error: any) {
                console.error(error);
                setError('Failed to fetch collections');
            }
        };
        fetchCollections();
    }, []);


    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files) {
            setFiles(Array.from(files));
            setFileNames(Array.from(files).map(file => file.name));
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submit}>
                <label 
                    className={[styles.imageLabel, dragging ? styles.dragOver : ''].join(' ')}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={filesSelected} 
                        style={{ display: 'none' }}
                    />
                    Drag an image here or click to upload
                </label>
                <div className={styles.fileList}>
                    {fileNames.map((name, index) => (
                        <div key={index}>{name}</div>
                    ))}
                </div>
                <label>
                    Collection:
                </label>
                <input list="collections" name="collections" />
                <datalist id="collections"  className={styles.collectionsInput}>
                    {collections.length > 0 ? collections.map(collection => (
                        <option key={collection._id} value={collection.name} />
                    )) : <option value="No collections found" />
                    }
                </datalist>
                <button type="submit" disabled={uploading}>Submit</button>
            </form>
            {uploading && <p>Uploading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {uploadSuccess && <p className={styles.successMessage}>Uploaded successfully!</p>}
        </div>
    );
}

export default PostImage;
