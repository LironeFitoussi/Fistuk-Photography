import styles from './Upload.module.scss';
import { useState, FormEvent, ChangeEvent } from 'react';
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

function PostImage() {
    const [files, setFiles] = useState<File[]>([]);
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (files.length === 0) return;

        setUploading(true);
        setError("");
        try {
            const result = await uploadImages({ images: files, description });
            // setImages(result.map(image => image.result.file.filename));
            console.log(result);
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
        } catch (error) {
            console.error("Failed to upload images", error.response.data);
            throw error.response.data.message;
        }
    }

    return (
        <div className="PostImage">
            <form onSubmit={submit}>
                <label>
                    Upload Images:
                    <input onChange={filesSelected} type="file" accept="image/*" multiple />
                </label>
                <label>
                    Description:
                    <input value={description} onChange={e => setDescription(e.target.value)} type="text" />
                </label>
                <button type="submit" disabled={uploading}>Submit</button>
            </form>
            {uploading && <p>Uploading...</p>}
            {error && <p className="error">{error}</p>}
            {images.map(image => (
                <div key={image}>
                    <img src={image} alt="uploaded" />
                </div>
            ))}
            <img src="/images/9fa06d3c5da7aec7f932beb5b3e60f1d" alt="example" />
        </div>
    );
}

export default PostImage;
