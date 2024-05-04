import mongoose, { Schema, Document } from 'mongoose';

interface ICollection extends Document {
    name: string;
    date: Date;
    location: string;
    description: string;
    photos: mongoose.Types.ObjectId[];  // References to Image documents
}

const collectionSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
});

const CollectionModel = mongoose.model<ICollection>('Collection', collectionSchema);
export default CollectionModel;
