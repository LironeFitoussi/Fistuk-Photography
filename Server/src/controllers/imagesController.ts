/// <reference types="progress" />
import { Request, Response } from 'express';
import Image from '../models/Image.model';
import Collection from '../models/Collections.model';
import ProgressBar from 'progress';
import s3 from '../s3'

import dotenv from 'dotenv';
dotenv.config();

import crypto from 'crypto';
import { 
  S3Client, 
  PutObjectCommand,
  GetObjectCommand
  
} from "@aws-sdk/client-s3";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({ 
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
  },
}); // Replace 'your-region' with your AWS region


const bucketName = process.env.AWS_BUCKET_NAME || '';
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
  const { collectionName } = req.body;
  console.log('req.body', req.body);
  console.log('collectionName', collectionName);

  const collection = await Collection.findOne({ name: collectionName });

  if (!collection) {
    console.log('Collection not found');
    return res.status(404).json({ message: ': Collection not found' });
  }

  const collectionId = collection._id;
  const totalFiles = req.files?.length || 0;
  const progressBar = new ProgressBar(`Uploading files [:bar] :current/:total :percent :etas`, {
    total: totalFiles,
    width: 30,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 100, // Update the progress bar every 100ms
  });

  const uploadPromises = req.files?.map(async (file, index) => {
    const fileName = `${randomIamgeName()}.jpeg`;
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    try {
      await s3.send(command);
      const image = new Image({
        filename: fileName,
        name: file.originalname,
        collectionId,
      });
      await image.save();
      progressBar.tick();
    } catch (error) {
      console.error('Failed to upload the image', error);
    }
  });

  if (uploadPromises && uploadPromises.length > 0) {
    try {
      await Promise.all(uploadPromises);
      console.log('\nSuccessfully uploaded all images');
      progressBar.terminate(); // Stop the progress bar
      res.status(201).json({ message: 'All images uploaded successfully' });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ message: 'An error occurred while uploading images' });
    }
  } else {
    res.status(400).json({ message: 'No files provided' });
  }
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

export const downloadImage = async (req: Request, res: Response) => {
  console.log('downloadImage');
  
  try {
    const { fileName } = req.query;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: fileName as string,
    };
    const command = new GetObjectCommand(params);
    const { Body } = await s3Client.send(command);
    console.log(Body);
    

    res.setHeader('Content-Disposition', `attachment; filename="LironeFitoussiPhotography${fileName}"`);
    res.setHeader('Content-Type', 'image/jpeg'); // Set appropriate content type

    if (Body) {
      const readableStream = Body as any;
      readableStream.pipe(res); // Pipe the S3 object's stream directly to the response
    } else {
      throw new Error('Empty response body');
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Error downloading file');
  }
};