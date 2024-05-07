export interface Collection {
    date: string;
    description: string;
    images: string[]; // Define a more specific type instead of 'any' if the image structure is known
    location: string;
    name: string;
    __v: number;
    _id: string;
}