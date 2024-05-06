import mongoose, { Schema, Document } from 'mongoose';

interface ICollection extends Document {
    name: string;
    albumId: string;
}

const collectionSchema: Schema = new Schema({
    name: { type: String, required: true },
    // date: { type: Date, required: true },
    // location: { type: String, required: true },
    albumId: { type: String, required: false },
});

const CollectionModel = mongoose.model<ICollection>('Collection', collectionSchema);
export default CollectionModel;
