import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CollectionsProps {
    // Add any props you need for the component here
}

interface Collection {
    collectionName: string;
    collectionDescription: string;
    collectionImage: string;
    collectionLink: string;
}

const Collections: React.FC<CollectionsProps> = () => {
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await axios.get('/api/collections');
                setCollections(response.data);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, []);

    console.log(collections);
    
    return (
        <div>
            {/* Add your component code here */}
        </div>
    );
};

export default Collections;
