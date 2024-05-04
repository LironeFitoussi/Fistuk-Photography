import express from 'express';
import { getAllImages, getImageById, createImage, deleteImage } from '../controllers/imagesController';
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// GET /images
router.get('/', getAllImages);

// GET /images/:id
router.get('/:id', getImageById);

// POST /images
router.post('/', upload.array('image'), createImage);

// DELETE /images/:id
router.delete('/:id', deleteImage);

export default router;
