import express from 'express';
import { 
    getAllProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject
} from '../controllers/projectsController';

const router = express.Router();

// GET all projects
router.get('/', getAllProjects);

// GET project by ID
router.get('/:id', getProjectById);

// POST create a new project
router.post('/', createProject);

// PATCH update a project
router.patch('/:id', updateProject);

// DELETE a project
router.delete('/:id', deleteProject);

export default router;