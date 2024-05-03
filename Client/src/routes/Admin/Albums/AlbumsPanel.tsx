import React from 'react';

interface Album {
    id: number;
    title: string;
    artist: string;
}

const AlbumsPanel: React.FC = () => {
    const albums: Album[] = [
        { id: 1, title: 'Album 1', artist: 'Artist 1' },
        { id: 2, title: 'Album 2', artist: 'Artist 2' },
        { id: 3, title: 'Album 3', artist: 'Artist 3' },
    ];

    return (
        <div>
            <h1>Albums</h1>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        {album.title} - {album.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumsPanel;
