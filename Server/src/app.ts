import express, { Request, Response } from 'express';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";

// routes import
import collectionsRoutes from "./routes/collectionsRoutes";
import imagesRoutes from "./routes/imagesRoutes";

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

// app.use("/", userRoutes);

// 404 Error Handler
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

export default app;
