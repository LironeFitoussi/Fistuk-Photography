import React , { useEffect, useState } from 'react';
import styles from './AlbumCard.module.css';
import { Album } from '../../types/interfaces';
import dateformat from 'dateformat';
interface AlbumCardProps {
    // Define the props for the AlbumCard component here
    album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({album}) => {
    return (
        <div className={styles.container}>
            <img src={album.albumCover} alt={album.name} className={styles.albumCoverImage}/>
            <h3>{album.name}</h3>
            <p>{dateformat(album.date, 'fullDate')}</p>
        </div>
    );
}

export default AlbumCard;