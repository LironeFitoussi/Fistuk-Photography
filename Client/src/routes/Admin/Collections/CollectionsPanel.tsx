import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface CollectionsPanelProps {
    // Add any additional props here if needed
}

interface Album {
    _id: string;
    name: string;
}

const CollectionsPanel: React.FC<CollectionsPanelProps> = () => {
    const collectionNameRef = useRef<HTMLInputElement>(null);
    const albumNameRef = useRef<HTMLInputElement>(null);

    const [albums, setAlbums] = useState<Album[]>([]);
    const [error, setError] = useState<string | null>(null);

    const dummyAlbums = [
        { _id: '1', name: 'Album 1' },
        { _id: '2', name: 'Album 2' },
        { _id: '3', name: 'Album 3' },
    ];

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/albums');
                setAlbums(response.data.data.albums);
            } catch (error: any) {
                console.error(error);
                setError('Failed to fetch albums');
            }
        };
        fetchAlbums();
    }, []);

    const handleCollectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (collectionNameRef.current && albumNameRef.current) {
            const collectionName = collectionNameRef.current.value;
            const albumName = albumNameRef.current.value;

            try {
                const response = await axios.post('http://localhost:3000/api/v1/collections', {
                    name: collectionName,
                    albumId: albumName,
                });
                console.log(response.data.data);
                // Rest fields
                collectionNameRef.current.value = '';
                albumNameRef.current.value = '';
                alert('Collection created successfully');
            } catch (error: any) {
                console.error(error.response.data.message);
                // setError(error.response.data.message);
            }
        }
    };

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleCollectionSubmit}>
                <input type="text" placeholder="Collection Name" required ref={collectionNameRef} />
                <input type="text" placeholder="Album Name" list="albums" ref={albumNameRef} />
                <datalist id="albums">
                    {albums.length > 0 ? albums.map(album => (
                        <option key={album._id} value={album.name} />
                    )) : dummyAlbums.map(album => (
                        <option key={album._id} value={album.name} />
                    ))}
                </datalist>
                <button type="submit">Create Collection</button>
            </form>
        </div>
    );
};

export default CollectionsPanel;
