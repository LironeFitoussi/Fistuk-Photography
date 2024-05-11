// AddNewProject.tsx
import React, { useState } from 'react';
import styles from './AddNewProject.module.css';
import { Project } from '../../types/interfaces.ts';
import axios from 'axios';
import serverUrl from '../../utils/APIUrl';
const AddNewProject: React.FC = () => {
  // State for form inputs
  const [projectData, setProjectData] = useState<Project>({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    demoLink: '',
    previewImage: '',
    projectType: 'mini-project',
    __v: 0,
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // split technologies string into an array
    const technologies = projectData.technologies.split(', ');
    // axios trycatch block
    try {
      const response = await axios.post(`${serverUrl}/api/v1/projects`, 
      {
        ...projectData,
        technologies
      });
      console.log(response.data.data.project);
    } catch (error) {
      console.error(error.response.data.message);
    }
    console.log('Submitted:', projectData);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  return (
    <div className={styles.container}>
      <h2>Add New Project</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Title:</label>
          <input type="text" name="title" value={projectData.title} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea name="description" value={projectData.description} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Technologies:</label>
          <input type="text" name="technologies" value={projectData.technologies} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Github Link:</label>
          <input type="text" name="githubLink" value={projectData.githubLink} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Demo Link:</label>
          <input type="text" name="demoLink" value={projectData.demoLink} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Preview Image:</label>
          <input type="text" name="previewImage" value={projectData.previewImage} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label>Project Type:</label>
          <input type="text" name="projectType" value={projectData.projectType} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewProject;
