import { Request, Response } from 'express';
import Image from '../models/Image.model';
import Collection from '../models/Collections.model';

import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import { 
  S3Client, 
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
import s3 from '../s3';


// // Safely retrieve environment variables
const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_REGION 
// const accessKeyId = process.env.AWS_ACCESS_KEY || ""
// const secretAccessKey = process.env.AWS_SECRET_KEY || ""

// const s3 = new S3Client({
//   region,
//   credentials: {
//     accessKeyId,
//     secretAccessKey
//   }
// });

interface CustomFile extends File {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}

interface CustomRequest extends Request {
    files?: CustomFile[];
    file?: CustomFile;
}

const randomIamgeName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createImage = async (req: CustomRequest, res: Response) => {
    const { description } = req.body;
    console.log('req.body', req.body);
    console.log('description', description);
    
    const collection = await Collection.findOne({ name: description });

    if (!collection) {
        console.log('Collection not found');
        return res.status(404).json({ message: ': Collection not found' });
    }

    req.files?.forEach(async (file) => {
        const fileName = `${randomIamgeName()}.jpeg`
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        
        const command = new PutObjectCommand(params);
        try {
            const data = await s3.send(command);
            console.log('Successfully uploaded the image');
            // Find the collections id fro the request body description using mongoose
            // console.log(data);
            
            const collectionId = collection._id;
            // console.log('collectionId', collectionId);
            console.log(fileName);
            
            
            const image = new Image({
                filename: fileName,
                name: file.originalname,
                collectionId: collectionId,
            });

            console.log('image', image);
            
            await image.save();
            res.status(201).json({ message: 'All images uploaded successfully', results: image });
        } catch (error) {
            console.error('Failed to upload the image', error);
        }
    });   
};


export const getAllImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.find();

        // Check if images array is empty
        if (images.length === 0) {
            return res.status(404).json({ message: 'No images found' });
        }

        // Get signed URLs for each image
        const modifiedImages = await Promise.all(images.map(async (image) => {
            const getObjectParams = {
                Bucket: bucketName,
                Key: image.filename,
            };
            const getCommand = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
            console.log('url', url);
            
            return { ...image.toObject(), url }; // toObject() is typically used with Mongoose models to get a plain object
        }));

        // Send the modified images array with URLs
        res.status(200).json(modifiedImages);
    } catch (error) {
        console.error('Failed to retrieve images:', error);
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
