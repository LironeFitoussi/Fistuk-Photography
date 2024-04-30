import express from 'express';
import { getAllImages, getImageById, createImage, deleteImage } from '../controllers/imagesController';
const router = express.Router();

// GET /images
router.get('/images', getAllImages);

// GET /images/:id
router.get('/images/:id', getImageById);

// POST /images
router.post('/images', createImage);

// DELETE /images/:id
router.delete('/images/:id', deleteImage);

export default router;
