import mongoose, { Schema, Document, ObjectId, PopulateOptions, Model } from 'mongoose';
import { ICollection } from '../models/Collections.model';

interface IAlbum extends Document {
  _id: ObjectId;
  name: string;
  date: Date;
  location: string;
  description: string;
  albumCover?: string;  // Optional as per your schema
  createdAt: Date;
  updatedAt: Date;
  collections: ICollection[];  // Ensure ICollection is correctly defined
}


const albumSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  albumCover: { type: String, required: false, default: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' },
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

albumSchema.post<IAlbum[]>(/^find/, async function (docs: any, next) {
  // console.log(docs);
  // if (typeof docs === 'object' ) {
  //   console.log('docs is an object');
  //   if (docs.collections.length > 0 && docs.collections[0].images && docs.collections[0].images.length > 0) {
  //     // Modify the albumCover field in memory
  //     // console.log('ok');
  //     // docs.albumCover = docs.collections[0].images[0].url;
  //   }
  // } else if (Array.isArray(docs)) {
  //   console.log('docs is an array');
  // }
  // docs.forEach(doc => {
  //   if (doc.collections.length > 0 && doc.collections[0].images && doc.collections[0].images.length > 0) {
  //     // Modify the albumCover field in memory
  //     // doc.albumCover = doc.collections[0].images[0].url;
  //   }
  // });
  next();
});


const AlbumModel = mongoose.model<IAlbum>('Album', albumSchema);
export default AlbumModel;