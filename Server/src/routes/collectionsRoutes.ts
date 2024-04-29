import express from 'express';
import { getAllCollections, getCollectionById, createCollection, deleteCollection } from '../controllers/collectionsController';

const router = express.Router();

// GET all photos
router.get('/', getAllCollections);

// GET photo by ID
router.get('/:id', getCollectionById);

// POST create a new photo
router.post('/', createCollection);

// DELETE a photo
router.delete('/:id', deleteCollection);

export default router;
