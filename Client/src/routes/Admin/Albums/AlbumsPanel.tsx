import stlyes from './AlbumsPanel.module.css';
import React, {useEffect} from 'react';
import axios from 'axios';
import AdminTable from '../../../components/AdminTable';
interface Album {
    id: number;
    title: string;
    artist: string;
}

const AlbumsPanel: React.FC = () => {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [albums, setAlbums] = React.useState([]);
    console.log(albums);
    
    useEffect(() => {
        // Fetch Albums from  server usinx axios in a async function
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/albums');
                console.log(response.data.data.albums);

                // Set the state of the albums here
                setAlbums(response.data.data.albums);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAlbums();
    }, []);

    useEffect(() => {
        if (albums.length > 0) {
            setIsDataLoaded(true);
        }
    }, [albums]);

    return (
        isDataLoaded && (
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
        )
    );
};

export default AlbumsPanel;
