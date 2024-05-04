import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Image document
interface IImage extends Document {
    name: string;
    filename: string;
    url: string;
    collectionId: mongoose.Types.ObjectId;
}

// Define the schema for the Image model
const ImageSchema: Schema = new Schema({
    name: { type: String, required: true },
    filename: { type: String, required: false },
    url: { type: String, required: false },
    collection: { type: mongoose.Types.ObjectId, ref: 'Collection', required: true },
});

// Create the Image model
const ImageModel = mongoose.model<IImage>('Image', ImageSchema);

export default ImageModel;
