import React, { useState } from 'react';
import axios from 'axios';

const Upload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedFilesArray = Array.from(files);
            setSelectedFiles(selectedFilesArray);
        }
    };

    const handleUpload = () => {
        // Perform post request to the server with selectedFiles
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('photos', file);
        });

        axios.post('http://localhost:3000/api', formData)
            .then((response) => {
                console.log('Upload successful:', response.data);
            })
            .catch((error) => {
                console.error('Error uploading:', error);
            });
    };


    return (
        <div>
            <input type="file" multiple accept=".jpg, .jpeg" onChange={handleFileChange} />
            {selectedFiles.length > 0 && (
                <ul>
                    {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                        ))}
                </ul>
            )}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Upload;
