import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Collection {
  _id: number;
  name: string;
  description: string;
  date: string;
  location: string;
}

const Root: React.FC = () => {
  const [data, setData] = useState<Collection[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/collections');
        console.log('Data fetched:', response.data.data.collections);
        
        setData(response.data.data.collections);
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      // try {
      //   const response = await axios.post('http://localhost:3000/api/v1/upload', formData);
      //   console.log('File uploaded:', response.data);
      // } catch (error) {
      //   throw new Error('Error uploading file');
      // }
    }
  };

  if (data.length > 0) {
    console.log(data);
  }
    
  return (
    <>
      <Navbar/>
      <h1>Collections</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewImage && <img src={previewImage} alt="Selected Image" style={{width: 400, height: 400}}/>}
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default Root;