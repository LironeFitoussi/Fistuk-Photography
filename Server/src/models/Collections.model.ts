import mongoose, { Schema, Document } from 'mongoose';

interface ICollection extends Document {
    name: string;
    albumId: string;

}

const collectionSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true,
        // Ensure that the name is unique
        unique: true
     },
    imageCover: { type: String, required: false },
    albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true }
});

const CollectionModel = mongoose.model<ICollection>('Collection', collectionSchema);
export default CollectionModel;
