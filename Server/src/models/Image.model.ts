import mongoose, { Schema, Document } from 'mongoose';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from '../s3';

const bucketName = process.env.AWS_BUCKET_NAME;

interface IImage extends Document {
    name: string;
    filename: string;
    url?: string;
    collectionId: mongoose.Types.ObjectId;
}

const ImageSchema: Schema<IImage> = new Schema({
    name: { type: String, required: true },
    filename: { type: String, required: true },
    url: { type: String, required: false },
    collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
});

// Use post-find hook for async operations
ImageSchema.post('find', async function (docs) {
    for (const doc of docs) {
        const getObjectParams = {
            Bucket: bucketName,
            Key: doc.filename,
        };
        const getCommand = new GetObjectCommand(getObjectParams);
        try {
            const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
            doc.url = url;
        } catch (error) {
            console.error('Error generating signed URL', error);
            // Handle errors or set url to null if necessary
        }
    }
});

const ImageModel = mongoose.model<IImage>('Image', ImageSchema);
export default ImageModel;
