import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Album document that extends mongoose.Document
interface IAlbum extends Document {
    name: string;
    date: Date;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Album schema
const albumSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true,
        unique: true  // Ensure no two albums have the same name
    },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create a model based on the schema and interface
const AlbumModel = mongoose.model<IAlbum>('Album', albumSchema);

export default AlbumModel;
