// AddNewProject.tsx
import React, { useEffect, useState } from "react";
import styles from "./AddNewProject.module.css";
import { Project } from "../../types/interfaces.ts";
import axios from "axios";
import serverUrl from "../../utils/APIUrl";
import { useAuth0 } from "@auth0/auth0-react";

const AddNewProject: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();

  // State for form inputs
  const [techStack, setTechStack] = useState<string[]>([]);
  const [projectData, setProjectData] = useState<Project>({
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    demoLink: "",
    previewImage: "",
    projectType: "mini-project",
    __v: 0,
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios trycatch block
    try {
      const response = await axios.post(`${serverUrl}/api/v1/projects`, {
        ...projectData,
      });
      console.log(response.data.data.project);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
    console.log("Submitted:", projectData);
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle tech stack input
  const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Checks first if last typed character is a space
    if (e.target.value.slice(-1) === " ") {
      // Removes the space and adds the tech to the stack
      setTechStack([...techStack, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  // Updates the technologies field in the projectData state with the techStack array
  useEffect(() => {
    // console.log(techStack);
    setProjectData((prevData) => ({
      ...prevData,
      technologies: techStack,
    }));
  }, [techStack]);

  return (
    isAuthenticated &&
    user?.nickname === "LironeFitoussi" && (
      <div className={styles.container}>
        <h2>Add New Project</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              className={styles.input}
              name="description"
              value={projectData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Technologies:</label>
            <div className={styles.stackInput}>
              {techStack.map((tech, index) => (
                <div className={styles.stackEl}>
                  <span key={index}>{tech}</span>
                  <button
                    className={styles.rmvBtn}
                    onClick={() =>
                      setTechStack(techStack.filter((_, i) => i !== index))
                    }
                  >
                    X
                  </button>
                </div>
              ))}
              <input
                className={styles.techStackInput}
                type="text"
                onChange={handleStackChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Github Link:</label>
            <input
              className={styles.input}
              type="text"
              name="githubLink"
              value={projectData.githubLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Demo Link:</label>
            <input
              className={styles.input}
              type="text"
              name="demoLink"
              value={projectData.demoLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Preview Image:</label>
            <input
              className={styles.input}
              type="text"
              name="previewImage"
              value={projectData.previewImage}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Project Type:</label>
            <input
              className={styles.input}
              type="text"
              name="projectType"
              value={projectData.projectType}
              onChange={handleChange}
            />
          </div>
        </form>
          <button type="submit">Submit</button>
      </div>
    )
  );
};

export default AddNewProject;
