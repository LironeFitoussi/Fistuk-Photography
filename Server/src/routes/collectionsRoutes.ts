import express from 'express';
import { 
    getAllCollections, 
    getCollectionById, 
    createCollection, 
    deleteCollection, 
    updateCollection, 
    getCollectionsByAlbumId 
} from '../controllers/collectionsController';

const router = express.Router();

// GET all photos
router.get('/', getAllCollections);

// GET Collection by ID
router.get('/:id', getCollectionById);

// GET Collections by Album ID
router.get('/album/:id', getCollectionsByAlbumId);

// POST create a new Collection
router.post('/', createCollection);

// PATCH update a Collection's Google Drive link
router.patch('/:id', updateCollection);

// DELETE a Collection
router.delete('/:id', deleteCollection);

export default router;
