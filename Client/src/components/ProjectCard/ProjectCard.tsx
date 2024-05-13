import { type Project } from "../../types/interfaces.ts";
import styles from "./ProjectCard.module.css";
import { FaGithub } from "react-icons/fa";
import { LuScreenShare } from "react-icons/lu";


interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className={styles.container}>
            <img src={project.previewImage} alt={project.title} />
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <h3>Teachnologies used</h3>
            <div className={styles.stack}>
                {project.technologies.map((tech, index) => (
                    <i className={`devicon-${tech.toLowerCase()}-original devicon-${tech.toLowerCase()}-plain`} key={index} title={`${tech}`}></i>
                ))}
            </div>
            <div className={styles.devider}></div>
            <div className={styles.links}>
                <a href={project.demoLink} target="_blank">Live Site <LuScreenShare/></a>
                <a href={project.githubLink} target="_blank">Github <FaGithub/></a>
            </div>
        </div>
    );
}

export default ProjectCard;