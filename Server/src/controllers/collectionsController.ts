import { Request, Response } from 'express';
import Collection from '../models/Collections.model';
import Image from '../models/Image.model';
import Album from '../models/Album.model';
// GET all collections
export const getAllCollections = async (req: Request, res: Response) => {
    try {
        const collections = await Collection.find();
        const collectionsWithImages = await Promise.all(collections.map(async (collection) => {
            const images = await Image.find({ collectionId: collection._id });
            return { ...collection.toObject(), images };
        }));

        res.status(200).json({
            status: 'success',
            results: collectionsWithImages.length,
            data: {
                collections: collectionsWithImages,
            },
        });
    } catch (err: unknown) {  // Specify that err might be of unknown type
        if (err instanceof Error) {  // Type guard
            res.status(404).json({
                status: 'fail',
                message: err.message,  // Now safely accessing message property
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: 'An unexpected error occurred'
            });
        }
    }
};

// GET collection by ID
export const getCollectionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const collection = await Collection.findById(id);
        if (!collection) {
            return res.status(404).json({
                status: 'fail',
                message: 'No collection found with that ID'
            });
        }
        const images = await Image.find({ collectionId: collection._id });
        const collectionWithImages = { ...collection.toObject(), images };
        res.status(200).json({
            status: 'success',
            data: {
                collection: collectionWithImages,
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

// POST create a new collection
export const createCollection = async (req: Request, res: Response) => {
    // Your implementation here
    console.log(req.body);
    const { name, albumId } = req.body;

    // Find the album by ID and check if it exists
    const album = await Album.findOne({ name: albumId });
    if (!album) {
        return res.status(404).json({
            status: 'fail',
            message: 'No album found with that ID'
        });
    }
    try {
        const collection = new Collection({
            name,
            albumId: album._id,
        });
        await collection.save();
        res.status(201).json({
            status: 'success',
            data: {
                collection,
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
export const deleteCollection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Collection.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                status: 'fail',
                message: 'No collection found with that ID'
            });
        }

        // Optionally, delete associated images as well
        await Image.deleteMany({ collectionId: result._id });

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

// PATCH update a collection's Google Drive link
export const updateCollection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { googleDriveLink } = req.body;
        const collection = await Collection.findByIdAndUpdate(id, { googleDriveLink: googleDriveLink }, { new: true });

        console.log(googleDriveLink);
        
        if (!collection) {
            return res.status(404).json({
                status: 'fail',
                message: 'No collection found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                collection,
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