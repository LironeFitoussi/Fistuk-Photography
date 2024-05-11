import { Request, Response } from 'express';
import Project from '../models/Project.model';
// GET all projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            status: 'success',
            results: projects.length,
            data: {
                projects,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'An unexpected error occurred'
            });
        }
    }
};

// GET project by ID
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'No project found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                project,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'An unexpected error occurred'
            });
        }
    }
};

// POST new project
export const createProject = async (req: Request, res: Response) => {
    console.log(req.body);
    
    try {
        const project = await Project.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                project,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(400).json({
                status: 'fail',
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'An unexpected error occurred'
            });
        }
    }
};

// PATCH update project by ID
export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({
                status: 'fail',
                message: 'No project found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                project,
            },
        });
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'An unexpected error occurred'
            });
        }
    }
}

// DELETE project by ID
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Project.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                status: 'fail',
                message: 'No project found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(404).json({
                status: 'fail',
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'An unexpected error occurred'
            });
        }
    }
};