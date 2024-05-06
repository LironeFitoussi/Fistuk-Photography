// TODO: Setup interfaces for props and state

import React ,{useState, useEffect} from 'react';
import axios from 'axios';
interface CollectionsPanelProps {
    // Add any props you need for the component
}

const CollectionsPanel: React.FC<CollectionsPanelProps> = () => {
    const [albums, setAlbums] = useState([]); // TODO: Fetch albums from server

    // dummy albums if fetch ddit workd
    const dummyAlbums = [
        { _id: '1', name: 'Album 1' },
        { _id: '2', name: 'Album 2' },
        { _id: '3', name: 'Album 3' },
    ];
    // Fetch albums from server using axios with async function
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/albums');
                setAlbums(response.data.data.albums);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAlbums();
    }, []);

    // Handle form submit
    const handleColllctionSubmit = (e: any) => {
        e.preventDefault();
        const collectionName = e.target[0].value;
        const albumName = e.target[1].value;
        console.log(collectionName, albumName);
        // Post collection to server using axios async funciton
        const postCollection = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/collections', {
                    name: collectionName,
                    album: albumName,
                });
                console.log(response.data.data);
            } catch (error: any) {
                console.error(error.response.data.message);
            }
        };
        postCollection();
    };

    return (
        <div>
            {/* Simple form with two input the collections name (required) and the album name open drop based on albums state(optional) */}
            <form
                onSubmit={handleColllctionSubmit}
            >
                <input type="text" placeholder="Collection Name" required />
                <input type="text" placeholder="Album Name" list="albums" />
                <datalist id="albums">
                    {albums.length > 0? albums.map((album: any) => ( //TODO: Setup interface for album
                        <option key={album._id} value={album.name} />
                    )) : dummyAlbums.map((album: any) => ( //TODO: Setup interface for album
                        <option key={album._id} value={album.name} />
                    ))}
                </datalist>
                <button type="submit">Create Collection</button>
            </form>
        </div>
    );
};

export default CollectionsPanel;
