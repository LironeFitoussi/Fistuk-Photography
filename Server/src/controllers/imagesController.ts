import { Request, Response } from 'express';
import Image from '../models/Image';

export const createImage = async (req: Request, res: Response) => {
    try {
        const { imageUrl, caption } = req.body;

        const newImage = new Image({
            imageUrl,
            caption,
        });

        const savedImage = await newImage.save();

        res.status(201).json(savedImage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create image', error });
    }
};

export const getAllImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.find();

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get images', error });
    }
};

export const getImageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get image', error });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete image', error });
    }
};
