import { Request, Response } from 'express';
import Album from '../models/Album.model';
// import Collection from '../models/Collections.model';

export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await Album.find();
        res.status(200).json({
            status: 'success',
            results: albums.length,
            data: {
                albums,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

export const getAlbumById = async (req: Request, res: Response) => {
    try {
        const album = await Album.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                album,
            },
        });
    } catch (err: any) {
        console.log(err.code);
        
        let message = '';
        if (err.code === 11000) {
            message = 'Album already exists';
        } else {
            message = err;
        }
        res.status(400).json({
            status: 'fail',
            message: message,
        });
    }
};

export const createAlbum = async (req: Request, res: Response) => {
    try {
        const newAlbum = await Album.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                album: newAlbum,
            },
        });
    } catch (err: any) {
        console.log(err.code);
        
        let message = '';
        if (err.code === 11000) {
            message = 'Album already exists';
        } else {
            message = err;
        }
        res.status(400).json({
            status: 'fail',
            message: message,
        });
    }
};

export const deleteAlbum = async (req: Request, res: Response) => {
    try {
        await Album.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

