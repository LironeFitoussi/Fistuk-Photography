// Objective: Development component to display mini projects and add new projects.

// Core Imports
import styles from './Development.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import serverUrl from '../../../utils/APIUrl';
// Components imports
import AddNewProject from '../../../components/AddNewProject/AddNewProject';
import ProjectCard from '../../../components/ProjectCard/ProjectCard';
import { Project } from '../../../types/interfaces';
const Development: React.FC = () => {
    const [miniProjects, setMiniProjects] = useState<Project[]>([]);
    const [mainProjects, setMainProjects] = useState<Project[]>([]);
    // Fetch mini projects from database using axios and tryCatch block inisde a useEffect hook
    useEffect(() => {
        // Fetch mini projects
        const fetchMiniProjects = async () => {
            try {
                // Fetch mini projects
                const response = await axios.get(`${serverUrl}/api/v1/projects`);
                // console.log(response.data.data.projects);
                const miniProjects = response.data.data.projects.filter((project: Project) => project.projectType === 'mini-project');
                const mainProjects = response.data.data.projects.filter((project: Project) => project.projectType === 'main-project');
                setMiniProjects(miniProjects);
                setMainProjects(mainProjects);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMiniProjects();
    }, []);

    // TODO: Add a section to display main projects
    // useEffect(() => {
    //     console.log(mainProjects);
    // }, [mainProjects]);

    return (
        <div className={styles.container}>
            {(import.meta.env.VITE_MODE === 'development' || import.meta.env.VITE_MODE === 'front-dev') 
                && <AddNewProject /> }
            <h1>Development Component</h1>
            <section>
                <h1>Mini Projects</h1>
                <div className={styles.projectsContainer}>
                    {miniProjects.map((miniProject) => {
                        return <ProjectCard key={miniProject._id} project={miniProject} />;
                    })}
                </div>

                <h1>Main Projects</h1>
                <div className={styles.projectsContainer}>
                    {mainProjects.map((mainProject) => {
                        return <ProjectCard key={mainProject._id} project={mainProject} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default Development;
