import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import serverUrl from '../../../utils/APIUrl';
import { Collection } from '../../../types/interfaces';
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
    const [collections, setCollections] = useState<Collection[]>([]);
    const [error, setError] = useState<string | null>(null);

    const dummyAlbums: Album[] = [
        { _id: '1', name: 'Album 1' },
        { _id: '2', name: 'Album 2' },
        { _id: '3', name: 'Album 3' },
    ];

    const fetchCollections = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/collections`);
            // console.log(response.data.data.collections);
            setCollections(response.data.data.collections);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch collections');
        }
    }

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/v1/albums`);
                setAlbums(response.data.data.albums);
            } catch (error: any) {
                console.error(error);
                setError('Failed to fetch albums');
            }
        };
        fetchAlbums();
    }, []);

    useEffect(() => {
        // fetch collections from server
        fetchCollections();
    }, [albums]);

    // patch request to update Google Drive link
    const handleGoogleDriveLinkUpdate = async (e: React.FormEvent<HTMLFormElement>, collectionId: string) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const googleDriveLink = formData.get('googleDriveLink');

        if (!googleDriveLink) {
            setError('Google Drive Link is required');
            throw new Error('Google Drive Link is required');
        }
        
        console.log(googleDriveLink);
        try {
            await axios.patch(`${serverUrl}/api/v1/collections/${collectionId}`, {
                googleDriveLink,
            });
            // console.log(response.data.data);
            console.log('Google Drive Link updated successfully');
            formData.reset();
            fetchCollections();
        } catch (error) {
            console.error(error);
            setError('Failed to update Google Drive Link');
        }
    };

    const handleCollectionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (collectionNameRef.current && albumNameRef.current) {
            const collectionName = collectionNameRef.current.value;
            const albumName = albumNameRef.current.value;

            try {
                const response = await axios.post(`${serverUrl}/api/v1/collections`, {
                    name: collectionName,
                    albumId: albumName,
                });
                console.log(response.data.data);
                // Rest fields
                collectionNameRef.current.value = '';
                albumNameRef.current.value = '';
                console.log('Collection created successfully');
                fetchCollections()
            } catch (error: any) {
                console.error(error.response.data.message);
                setError(error.response.data.message);
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

            <div>
                <h2>Collections</h2>
                <ul>
                    {collections.map(collection => (
                        <li key={collection._id}>
                            <p>{collection.name}</p>
                            {/* form to update collecrtion's Google Drive Link */}
                            <form onSubmit={(e) => handleGoogleDriveLinkUpdate(e, collection._id)}>
                                <input type="text" placeholder="Google Drive Link" name='googleDriveLink' />
                                {collection.googleDriveLink ? <button type="submit" style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    padding: '5px 10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}>Update</button> : 
                                <button type="submit" style={{
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: '5px 10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '5px'
                                }}>Add</button>
                                }
                                {error && <div>{error}</div>}
                            </form>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CollectionsPanel;
