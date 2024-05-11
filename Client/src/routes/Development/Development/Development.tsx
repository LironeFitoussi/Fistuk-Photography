// Objective: Development component to display mini projects and add new projects.

// Core Imports
import styles from './Development.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components imports
import AddNewProject from '../../../components/AddNewProject/AddNewProject';

const Development: React.FC = () => {
    const [miniProjects, setMiniProjects] = useState<any[]>([]);
    // Fetch mini projects from database using axios and tryCatch block inisde a useEffect hook
    useEffect(() => {
        // Fetch mini projects
        const fetchMiniProjects = async () => {
            try {
                // Fetch mini projects
                const response = await axios.get('/api/mini-projects');
                console.log(response.data.data.miniProjects);
                setMiniProjects(response.data.data.miniProjects);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMiniProjects();
    }, []);


    return (
        <div className={styles.container}>
            { (import.meta.env.VITE_MODE === 'development' || import.meta.env.VITE_MODE === 'front-dev') && 
                <AddNewProject />
            }
            <h1>Development Component</h1>
            <section>
                <h1>Mini Projects</h1>
                <div>
                    {miniProjects.map((miniProject) => (
                        <div key={miniProject._id}>
                            <h2>{miniProject.title}</h2>
                            <p>{miniProject.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Development;
