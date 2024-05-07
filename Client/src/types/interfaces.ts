export interface Collection {
    date: string;
    description: string;
    images: Photo[]; // Define a more specific type instead of 'any' if the image structure is known
    location: string;
    name: string;
    __v: number;
    _id: string;
    imageCover?: string;
}

export interface Photo {
    _id: string;
    name: string;
    filename: string;
    collectionId: string;
    __v: number;
    url: string;
}

export interface Album {
    _id: string;
    name: string;
    date: Date;
    location: string;
    description: string; //TODO: Add description to the Album model
    collections: Collection[];
    albumCover: string;
    __v: number;
}
