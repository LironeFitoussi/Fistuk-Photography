import stlyes from './AlbumsPanel.module.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import AdminTable from '../../../components/AdminTable';
import serverUrl from '../../../utils/APIUrl';

const AlbumsPanel: React.FC = () => {
    // const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [albums, setAlbums] = React.useState([]);
    // console.log(albums);
    // Fetch Albums from  server usinx axios in a async function
    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/albums`);
            // console.log(response.data.data.albums);

            // Set the state of the albums here
            setAlbums(response.data.data.albums);
        } catch (error) {
            console.error(error);
        }
    };

    // Handle new album form submission and post to server
    const handleNewAlbumSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const newAlbum = {
            name: formData.get('name') as string,
            date: formData.get('date') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
        };
        console.log(newAlbum);
        // Post to server in async function
        const postNewAlbum = async () => {
            try {
                const response = await axios.post(`${serverUrl}/api/v1/albums`, newAlbum);
                console.log(response);
                fetchAlbums();
            } catch (error) {
                console.error(error);
            }
        };
        postNewAlbum();
    };
    
    

    useEffect(() => {
        fetchAlbums();
    }, []);

    // useEffect(() => {
    //     if (albums.length > 0) {
    //         setIsDataLoaded(true);
    //     }
    // }, [albums]);

    return (
        // isDataLoaded && 
        (
            <>
                <div className={stlyes.container}>
                <h1>Albums</h1>
                    {/* <ul>
                        {albums.map((album) => (
                            <li key={album.id}>
                                {album.title} - {album.artist}
                            </li>
                        ))}
                    </ul> */}
                    < AdminTable data={albums}/>
                </div>

                {/* Table to Create an album */}
                <div>
                    <h1>Create an Album</h1>
                    <form 
                        className={stlyes.newAlbumForm}
                        onSubmit={handleNewAlbumSubmit}    
                    >
                        <label htmlFor="title">Name</label>
                        <input type="text" id="title" name="name" />
                        <label htmlFor="artist">Date</label>
                        <input type="text" id="artist" name="date" />
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" name="location" />
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" />
                        <button type="submit">Create Album</button>
                    </form>
                </div>
            </>
        )

        
    );
};

export default AlbumsPanel;
