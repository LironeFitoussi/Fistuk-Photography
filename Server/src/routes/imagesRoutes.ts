import express from 'express';
import { getAllImages, getImageById, createImage, deleteImage, downloadImage } from '../controllers/imagesController';
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// GET /images
router.get('/', getAllImages);

router.get('/downloadImage',
// (req, res) => {
//     res.send('downloadImage');
// }
downloadImage
);
// GET /images/:id
router.get('/:id', getImageById);

// POST /images
router.post('/', upload.array('image'), createImage);

// DELETE /images/:id
router.delete('/:id', deleteImage);

// GET /download/?fileName=filename

export default router;
