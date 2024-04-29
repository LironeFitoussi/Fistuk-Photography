import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the collection document
interface ICollection extends Document {
    name: string;
    date: Date;
    location: string;
    description: string;
    photos: string[];
}

// Define the schema for the collection
const collectionSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String, required: true }]
});

// Create and export the collection model
export default mongoose.model<ICollection>('CollectionModel', collectionSchema);
