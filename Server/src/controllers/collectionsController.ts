import { Request, Response } from 'express';
import CollectionModel from '../models/Collections.model';

// GET all collections
export const getAllCollections = async (req: Request, res: Response) => {
    try {
        const collections = await CollectionModel.find();
        res.status(200).json({
            status: 'success',
            results: collections.length,
            data: {
                collections,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

// GET collection by ID
export const getCollectionById = (req: Request, res: Response) => {
    // Your implementation here
};

// POST create a new collection
export const createCollection = async (req: Request, res: Response) => {
    // Your implementation here
    const parsedWithDate = {
        ...req.body,
        date: new Date(req.body.date),
    }
    try {
        const newCollection = await CollectionModel.create(parsedWithDate);
        res.status(201).json({
            status: 'success',
            data: {
                collection: newCollection,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

// DELETE a collection
export const deleteCollection = (req: Request, res: Response) => {
    // Your implementation here
};
