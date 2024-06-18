import styles from './Certificates.module.css';
import React, { useEffect, useState } from 'react';

interface Certificate: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;§
}

interface Certificates: Certificate[]
 
const Certificates: React.FC = () => {
    return (
        <div>
            <h1>this is Certificates</h1>
        </div>
    );
}

export default Certificates