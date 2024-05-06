import mongoose, { Schema, Document, ObjectId, PopulateOptions, Model } from 'mongoose';
import { ICollection } from '../models/Collections.model';

interface IAlbum extends Document {
  _id: ObjectId;
  name: string;
  date: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  collections: ICollection[];
}

const albumSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

albumSchema.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: 'albumId'
});

albumSchema.set('toJSON', { virtuals: true });
albumSchema.set('toObject', { virtuals: true });

albumSchema.pre(/^find/, function (next) {
  const populateOptions: PopulateOptions = {
    path: 'collections',
    model: 'Collection'
  };
  (this.populate as any)(populateOptions); // Cast the populate method to `any`
  next();
});

const AlbumModel = mongoose.model<IAlbum>('Album', albumSchema);
export default AlbumModel;