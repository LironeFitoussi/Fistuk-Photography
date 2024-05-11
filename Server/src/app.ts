import express, { Request, Response } from 'express';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import AdmZip from "adm-zip";
import path from 'path';
import AWS from 'aws-sdk';

// routes import
import collectionsRoutes from "./routes/collectionsRoutes";
import imagesRoutes from "./routes/imagesRoutes";
import albumsRoutes from "./routes/albumsRoutes";
import projectsRoutes from "./routes/projectsRoutes";
declare global {
  namespace Express {
    interface Request {
      requestTime?: string;
    }
  }
}

const app = express();

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Rate limiting
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            "duration",
            "ratingsQuantity",
            "ratingsAverage",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

// Enable CORS
app.use(cors());
app.options("*", cors());

// Test middleware
app.use((req: Request, res: Response, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// TODO: Setup Routes
// Example: const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/collections", collectionsRoutes); 
app.use("/api/v1/images", imagesRoutes);
app.use("/api/v1/albums", albumsRoutes);
app.use("/api/v1/projects", projectsRoutes);

//! TODO: Setup Routes 

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
    region: process.env.AWS_REGION as string,
});
const s3 = new AWS.S3();


app.post('/api/v1/compress', async (req, res) => {
    const { files } = req.body;

    try {
        const zip = new AdmZip();

        // Download files from S3 and add them to the zip archive
        for (const filename of files) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME as string,
                Key: filename // Assuming filenames are keys in your S3 bucket
            };
            const data = await s3.getObject(params).promise();
            const body = data.Body as Buffer | undefined; // Type assertion
            if (body) {
                zip.addFile(filename, body);
            } else {
                console.warn(`Body is undefined for file ${filename}`);
            }
        }

        const outputFilePath = path.join(__dirname, '/images.zip');
        zip.writeZip(outputFilePath);

        res.download(outputFilePath);
    } catch (error) {
        console.error('Error compressing files:', error);
        res.status(500).send('Error compressing files');
    }
});

//! TODO: Setup Routes
// app.use("/", userRoutes);

// 404 Error Handler
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

export default app;
