import mongoose, { Schema, Document, ObjectId, PopulateOptions, Model } from 'mongoose';

interface IProject extends Document {
    // _id: string;
    title: string;
    description: string;
    technologies: string[];
    githubLink: string;
    demoLink: string;
    previewImage: string;
    projectType: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema: Schema<IProject> = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    githubLink: { type: String, required: true },
    demoLink: { type: String, required: true },
    previewImage: { type: String, required: true },
    projectType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ProjectModel: Model<IProject> = mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;