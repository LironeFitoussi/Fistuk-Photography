/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst express_rate_limit_1 = __importDefault(__webpack_require__(/*! express-rate-limit */ \"express-rate-limit\"));\nconst helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nconst express_mongo_sanitize_1 = __importDefault(__webpack_require__(/*! express-mongo-sanitize */ \"express-mongo-sanitize\"));\nconst xss_clean_1 = __importDefault(__webpack_require__(/*! xss-clean */ \"xss-clean\"));\nconst hpp_1 = __importDefault(__webpack_require__(/*! hpp */ \"hpp\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\n// routes import\nconst collectionsRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/collectionsRoutes */ \"./src/routes/collectionsRoutes.ts\"));\nconst imagesRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/imagesRoutes */ \"./src/routes/imagesRoutes.ts\"));\nconst albumsRoutes_1 = __importDefault(__webpack_require__(/*! ./routes/albumsRoutes */ \"./src/routes/albumsRoutes.ts\"));\nconst app = (0, express_1.default)();\n// Set security HTTP headers\napp.use((0, helmet_1.default)());\n// Development logging\nif (true) {\n    const morgan = __webpack_require__(/*! morgan */ \"morgan\");\n    app.use(morgan(\"dev\"));\n}\n// Body parser, reading data from body into req.body\napp.use(express_1.default.json({ limit: \"10kb\" }));\napp.use(express_1.default.urlencoded({ extended: true, limit: \"10kb\" }));\n// Rate limiting\nconst limiter = (0, express_rate_limit_1.default)({\n    max: 1000,\n    windowMs: 60 * 60 * 1000,\n    message: \"Too many requests from this IP, please try again in an hour!\",\n});\napp.use(\"/api\", limiter);\n// Data sanitization against NoSQL query injection\napp.use((0, express_mongo_sanitize_1.default)());\n// Data sanitization against XSS\napp.use((0, xss_clean_1.default)());\n// Prevent parameter pollution\napp.use((0, hpp_1.default)({\n    whitelist: [\n        \"duration\",\n        \"ratingsQuantity\",\n        \"ratingsAverage\",\n        \"maxGroupSize\",\n        \"difficulty\",\n        \"price\",\n    ],\n}));\n// Enable CORS\napp.use((0, cors_1.default)());\napp.options(\"*\", (0, cors_1.default)());\n// Test middleware\napp.use((req, res, next) => {\n    req.requestTime = new Date().toISOString();\n    next();\n});\n// TODO: Setup Routes\n// Example: const userRoutes = require(\"./routes/userRoutes\");\napp.use(\"/api/v1/collections\", collectionsRoutes_1.default);\napp.use(\"/api/v1/images\", imagesRoutes_1.default);\napp.use(\"/api/v1/albums\", albumsRoutes_1.default);\n// app.use(\"/\", userRoutes);\n// 404 Error Handler\napp.all(\"*\", (req, res, next) => {\n    res.status(404).json({\n        status: \"fail\",\n        message: `Can't find ${req.originalUrl} on this server!`,\n    });\n});\nexports[\"default\"] = app;\n\n\n//# sourceURL=webpack://server/./src/app.ts?");

/***/ }),

/***/ "./src/controllers/albumsController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/albumsController.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteAlbum = exports.createAlbum = exports.getAlbumById = exports.getAllAlbums = void 0;\nconst Album_model_1 = __importDefault(__webpack_require__(/*! ../models/Album.model */ \"./src/models/Album.model.ts\"));\n// import Collection from '../models/Collections.model';\nconst getAllAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const albums = yield Album_model_1.default.find();\n        res.status(200).json({\n            status: 'success',\n            results: albums.length,\n            data: {\n                albums,\n            },\n        });\n    }\n    catch (err) {\n        res.status(400).json({\n            status: 'fail',\n            message: err,\n        });\n    }\n});\nexports.getAllAlbums = getAllAlbums;\nconst getAlbumById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const album = yield Album_model_1.default.findById(req.params.id);\n        res.status(200).json({\n            status: 'success',\n            data: {\n                album,\n            },\n        });\n    }\n    catch (err) {\n        console.log(err.code);\n        let message = '';\n        if (err.code === 11000) {\n            message = 'Album already exists';\n        }\n        else {\n            message = err;\n        }\n        res.status(400).json({\n            status: 'fail',\n            message: message,\n        });\n    }\n});\nexports.getAlbumById = getAlbumById;\nconst createAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const newAlbum = yield Album_model_1.default.create(req.body);\n        res.status(201).json({\n            status: 'success',\n            data: {\n                album: newAlbum,\n            },\n        });\n    }\n    catch (err) {\n        console.log(err.code);\n        let message = '';\n        if (err.code === 11000) {\n            message = 'Album already exists';\n        }\n        else {\n            message = err;\n        }\n        res.status(400).json({\n            status: 'fail',\n            message: message,\n        });\n    }\n});\nexports.createAlbum = createAlbum;\nconst deleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        yield Album_model_1.default.findByIdAndDelete(req.params.id);\n        res.status(204).json({\n            status: 'success',\n            data: null,\n        });\n    }\n    catch (err) {\n        res.status(400).json({\n            status: 'fail',\n            message: err,\n        });\n    }\n});\nexports.deleteAlbum = deleteAlbum;\n\n\n//# sourceURL=webpack://server/./src/controllers/albumsController.ts?");

/***/ }),

/***/ "./src/controllers/collectionsController.ts":
/*!**************************************************!*\
  !*** ./src/controllers/collectionsController.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteCollection = exports.createCollection = exports.getCollectionById = exports.getAllCollections = void 0;\nconst Collections_model_1 = __importDefault(__webpack_require__(/*! ../models/Collections.model */ \"./src/models/Collections.model.ts\"));\nconst Image_model_1 = __importDefault(__webpack_require__(/*! ../models/Image.model */ \"./src/models/Image.model.ts\"));\nconst Album_model_1 = __importDefault(__webpack_require__(/*! ../models/Album.model */ \"./src/models/Album.model.ts\"));\n// GET all collections\nconst getAllCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const collections = yield Collections_model_1.default.find();\n        const collectionsWithImages = yield Promise.all(collections.map((collection) => __awaiter(void 0, void 0, void 0, function* () {\n            const images = yield Image_model_1.default.find({ collectionId: collection._id });\n            return Object.assign(Object.assign({}, collection.toObject()), { images });\n        })));\n        res.status(200).json({\n            status: 'success',\n            results: collectionsWithImages.length,\n            data: {\n                collections: collectionsWithImages,\n            },\n        });\n    }\n    catch (err) { // Specify that err might be of unknown type\n        if (err instanceof Error) { // Type guard\n            res.status(404).json({\n                status: 'fail',\n                message: err.message, // Now safely accessing message property\n            });\n        }\n        else {\n            res.status(500).json({\n                status: 'fail',\n                message: 'An unexpected error occurred'\n            });\n        }\n    }\n});\nexports.getAllCollections = getAllCollections;\n// GET collection by ID\nconst getCollectionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { id } = req.params;\n        const collection = yield Collections_model_1.default.findById(id);\n        if (!collection) {\n            return res.status(404).json({\n                status: 'fail',\n                message: 'No collection found with that ID'\n            });\n        }\n        const images = yield Image_model_1.default.find({ collectionId: collection._id });\n        const collectionWithImages = Object.assign(Object.assign({}, collection.toObject()), { images });\n        res.status(200).json({\n            status: 'success',\n            data: {\n                collection: collectionWithImages,\n            },\n        });\n    }\n    catch (err) {\n        if (err instanceof Error) {\n            res.status(404).json({\n                status: 'fail',\n                message: err.message,\n            });\n        }\n        else {\n            res.status(500).json({\n                status: 'fail',\n                message: 'An unexpected error occurred'\n            });\n        }\n    }\n});\nexports.getCollectionById = getCollectionById;\n// POST create a new collection\nconst createCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    // Your implementation here\n    console.log(req.body);\n    const { name, albumId } = req.body;\n    // Find the album by ID and check if it exists\n    const album = yield Album_model_1.default.findOne({ name: albumId });\n    if (!album) {\n        return res.status(404).json({\n            status: 'fail',\n            message: 'No album found with that ID'\n        });\n    }\n    try {\n        const collection = new Collections_model_1.default({\n            name,\n            albumId: album._id,\n        });\n        yield collection.save();\n        res.status(201).json({\n            status: 'success',\n            data: {\n                collection,\n            },\n        });\n    }\n    catch (err) {\n        res.status(400).json({\n            status: 'fail',\n            message: err,\n        });\n    }\n});\nexports.createCollection = createCollection;\n// DELETE a collection\nconst deleteCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { id } = req.params;\n        const result = yield Collections_model_1.default.findByIdAndDelete(id);\n        if (!result) {\n            return res.status(404).json({\n                status: 'fail',\n                message: 'No collection found with that ID'\n            });\n        }\n        // Optionally, delete associated images as well\n        yield Image_model_1.default.deleteMany({ collectionId: result._id });\n        res.status(204).json({\n            status: 'success',\n            data: null,\n        });\n    }\n    catch (err) {\n        if (err instanceof Error) {\n            res.status(404).json({\n                status: 'fail',\n                message: err.message,\n            });\n        }\n        else {\n            res.status(500).json({\n                status: 'fail',\n                message: 'An unexpected error occurred'\n            });\n        }\n    }\n});\nexports.deleteCollection = deleteCollection;\n\n\n//# sourceURL=webpack://server/./src/controllers/collectionsController.ts?");

/***/ }),

/***/ "./src/controllers/imagesController.ts":
/*!*********************************************!*\
  !*** ./src/controllers/imagesController.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteImage = exports.getImageById = exports.getAllImages = exports.createImage = void 0;\nconst Image_model_1 = __importDefault(__webpack_require__(/*! ../models/Image.model */ \"./src/models/Image.model.ts\"));\nconst Collections_model_1 = __importDefault(__webpack_require__(/*! ../models/Collections.model */ \"./src/models/Collections.model.ts\"));\nconst progress_1 = __importDefault(__webpack_require__(/*! progress */ \"progress\"));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\ndotenv_1.default.config();\nconst crypto_1 = __importDefault(__webpack_require__(/*! crypto */ \"crypto\"));\nconst client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\nconst { getSignedUrl } = __webpack_require__(/*! @aws-sdk/s3-request-presigner */ \"@aws-sdk/s3-request-presigner\");\nconst s3_1 = __importDefault(__webpack_require__(/*! ../s3 */ \"./src/s3.ts\"));\nconst bucketName = process.env.AWS_BUCKET_NAME;\nconst randomIamgeName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString('hex');\nconst createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _a, _b;\n    const { collectionName } = req.body;\n    console.log('req.body', req.body);\n    console.log('collectionName', collectionName);\n    const collection = yield Collections_model_1.default.findOne({ name: collectionName });\n    if (!collection) {\n        console.log('Collection not found');\n        return res.status(404).json({ message: ': Collection not found' });\n    }\n    const collectionId = collection._id;\n    const totalFiles = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) || 0;\n    const progressBar = new progress_1.default(`Uploading files [:bar] :current/:total :percent :etas`, {\n        total: totalFiles,\n        width: 30,\n        complete: '=',\n        incomplete: ' ',\n        renderThrottle: 100, // Update the progress bar every 100ms\n    });\n    const uploadPromises = (_b = req.files) === null || _b === void 0 ? void 0 : _b.map((file, index) => __awaiter(void 0, void 0, void 0, function* () {\n        const fileName = `${randomIamgeName()}.jpeg`;\n        const params = {\n            Bucket: bucketName,\n            Key: fileName,\n            Body: file.buffer,\n            ContentType: file.mimetype,\n        };\n        const command = new client_s3_1.PutObjectCommand(params);\n        try {\n            yield s3_1.default.send(command);\n            const image = new Image_model_1.default({\n                filename: fileName,\n                name: file.originalname,\n                collectionId,\n            });\n            yield image.save();\n            progressBar.tick();\n        }\n        catch (error) {\n            console.error('Failed to upload the image', error);\n        }\n    }));\n    if (uploadPromises && uploadPromises.length > 0) {\n        try {\n            yield Promise.all(uploadPromises);\n            console.log('\\nSuccessfully uploaded all images');\n            progressBar.terminate(); // Stop the progress bar\n            res.status(201).json({ message: 'All images uploaded successfully' });\n        }\n        catch (error) {\n            console.error('Error uploading images:', error);\n            res.status(500).json({ message: 'An error occurred while uploading images' });\n        }\n    }\n    else {\n        res.status(400).json({ message: 'No files provided' });\n    }\n});\nexports.createImage = createImage;\nconst getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const images = yield Image_model_1.default.find();\n        // Check if images array is empty\n        if (images.length === 0) {\n            return res.status(404).json({ message: 'No images found' });\n        }\n        // Get signed URLs for each image\n        const modifiedImages = yield Promise.all(images.map((image) => __awaiter(void 0, void 0, void 0, function* () {\n            const getObjectParams = {\n                Bucket: bucketName,\n                Key: image.filename,\n            };\n            const getCommand = new client_s3_1.GetObjectCommand(getObjectParams);\n            const url = yield getSignedUrl(s3_1.default, getCommand, { expiresIn: 3600 });\n            console.log('url', url);\n            return Object.assign(Object.assign({}, image.toObject()), { url }); // toObject() is typically used with Mongoose models to get a plain object\n        })));\n        // Send the modified images array with URLs\n        res.status(200).json(modifiedImages);\n    }\n    catch (error) {\n        console.error('Failed to retrieve images:', error);\n        res.status(500).json({ message: 'Failed to get images', error });\n    }\n});\nexports.getAllImages = getAllImages;\nconst getImageById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { id } = req.params;\n        const image = yield Image_model_1.default.findById(id);\n        if (!image) {\n            return res.status(404).json({ message: 'Image not found' });\n        }\n        res.status(200).json(image);\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Failed to get image', error });\n    }\n});\nexports.getImageById = getImageById;\nconst deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { id } = req.params;\n        const deletedImage = yield Image_model_1.default.findByIdAndDelete(id);\n        if (!deletedImage) {\n            return res.status(404).json({ message: 'Image not found' });\n        }\n        res.status(200).json({ message: 'Image deleted successfully' });\n    }\n    catch (error) {\n        res.status(500).json({ message: 'Failed to delete image', error });\n    }\n});\nexports.deleteImage = deleteImage;\n\n\n//# sourceURL=webpack://server/./src/controllers/imagesController.ts?");

/***/ }),

/***/ "./src/models/Album.model.ts":
/*!***********************************!*\
  !*** ./src/models/Album.model.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importStar(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst albumSchema = new mongoose_1.Schema({\n    name: { type: String, required: true, unique: true },\n    date: { type: Date, required: true },\n    location: { type: String, required: true },\n    description: { type: String, required: true },\n    albumCover: { type: String, required: false, default: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' },\n    createdAt: { type: Date, default: Date.now },\n    updatedAt: { type: Date, default: Date.now }\n});\nalbumSchema.virtual('collections', {\n    ref: 'Collection',\n    localField: '_id',\n    foreignField: 'albumId'\n});\nalbumSchema.set('toJSON', { virtuals: true });\nalbumSchema.set('toObject', { virtuals: true });\nalbumSchema.pre(/^find/, function (next) {\n    const populateOptions = {\n        path: 'collections',\n        model: 'Collection'\n    };\n    this.populate(populateOptions); // Cast the populate method to `any`\n    next();\n});\nalbumSchema.post(/^find/, function (docs, next) {\n    return __awaiter(this, void 0, void 0, function* () {\n        // console.log(docs);\n        // if (typeof docs === 'object' ) {\n        //   console.log('docs is an object');\n        //   if (docs.collections.length > 0 && docs.collections[0].images && docs.collections[0].images.length > 0) {\n        //     // Modify the albumCover field in memory\n        //     // console.log('ok');\n        //     // docs.albumCover = docs.collections[0].images[0].url;\n        //   }\n        // } else if (Array.isArray(docs)) {\n        //   console.log('docs is an array');\n        // }\n        // docs.forEach(doc => {\n        //   if (doc.collections.length > 0 && doc.collections[0].images && doc.collections[0].images.length > 0) {\n        //     // Modify the albumCover field in memory\n        //     // doc.albumCover = doc.collections[0].images[0].url;\n        //   }\n        // });\n        next();\n    });\n});\nconst AlbumModel = mongoose_1.default.model('Album', albumSchema);\nexports[\"default\"] = AlbumModel;\n\n\n//# sourceURL=webpack://server/./src/models/Album.model.ts?");

/***/ }),

/***/ "./src/models/Collections.model.ts":
/*!*****************************************!*\
  !*** ./src/models/Collections.model.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importStar(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst collectionSchema = new mongoose_1.Schema({\n    name: {\n        type: String,\n        required: true,\n        // Ensure that the name is unique\n        unique: true\n    },\n    imageCover: { type: String, required: false },\n    albumId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Album', required: true }\n});\nconst CollectionModel = mongoose_1.default.model('Collection', collectionSchema);\nexports[\"default\"] = CollectionModel;\n\n\n//# sourceURL=webpack://server/./src/models/Collections.model.ts?");

/***/ }),

/***/ "./src/models/Image.model.ts":
/*!***********************************!*\
  !*** ./src/models/Image.model.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importStar(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\nconst s3_request_presigner_1 = __webpack_require__(/*! @aws-sdk/s3-request-presigner */ \"@aws-sdk/s3-request-presigner\");\nconst s3_1 = __importDefault(__webpack_require__(/*! ../s3 */ \"./src/s3.ts\"));\nconst bucketName = process.env.AWS_BUCKET_NAME;\nconst ImageSchema = new mongoose_1.Schema({\n    name: { type: String, required: true },\n    filename: { type: String, required: true },\n    url: { type: String, required: false },\n    collectionId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Collection', required: true },\n});\n// Use post-find hook for async operations\nImageSchema.post('find', function (docs) {\n    return __awaiter(this, void 0, void 0, function* () {\n        for (const doc of docs) {\n            const getObjectParams = {\n                Bucket: bucketName,\n                Key: doc.filename,\n            };\n            const getCommand = new client_s3_1.GetObjectCommand(getObjectParams);\n            try {\n                const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_1.default, getCommand, { expiresIn: 3600 });\n                doc.url = url;\n            }\n            catch (error) {\n                console.error('Error generating signed URL', error);\n                // Handle errors or set url to null if necessary\n            }\n        }\n    });\n});\nconst ImageModel = mongoose_1.default.model('Image', ImageSchema);\nexports[\"default\"] = ImageModel;\n\n\n//# sourceURL=webpack://server/./src/models/Image.model.ts?");

/***/ }),

/***/ "./src/routes/albumsRoutes.ts":
/*!************************************!*\
  !*** ./src/routes/albumsRoutes.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst albumsController_1 = __webpack_require__(/*! ../controllers/albumsController */ \"./src/controllers/albumsController.ts\");\nconst router = express_1.default.Router();\n// GET /albums\nrouter.get(\"/\", albumsController_1.getAllAlbums);\n// GET /albums/:id\nrouter.get(\"/:id\", albumsController_1.getAlbumById);\n// POST /albums\nrouter.post(\"/\", albumsController_1.createAlbum);\n// DELETE /albums/:id\nrouter.delete(\"/:id\", albumsController_1.deleteAlbum);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://server/./src/routes/albumsRoutes.ts?");

/***/ }),

/***/ "./src/routes/collectionsRoutes.ts":
/*!*****************************************!*\
  !*** ./src/routes/collectionsRoutes.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst collectionsController_1 = __webpack_require__(/*! ../controllers/collectionsController */ \"./src/controllers/collectionsController.ts\");\nconst router = express_1.default.Router();\n// GET all photos\nrouter.get('/', collectionsController_1.getAllCollections);\n// GET Collection by ID\nrouter.get('/:id', collectionsController_1.getCollectionById);\n// POST create a new Collection\nrouter.post('/', collectionsController_1.createCollection);\n// DELETE a Collection\nrouter.delete('/:id', collectionsController_1.deleteCollection);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://server/./src/routes/collectionsRoutes.ts?");

/***/ }),

/***/ "./src/routes/imagesRoutes.ts":
/*!************************************!*\
  !*** ./src/routes/imagesRoutes.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst imagesController_1 = __webpack_require__(/*! ../controllers/imagesController */ \"./src/controllers/imagesController.ts\");\nconst router = express_1.default.Router();\nconst multer = __webpack_require__(/*! multer */ \"multer\");\nconst storage = multer.memoryStorage();\nconst upload = multer({ storage: storage });\n// GET /images\nrouter.get('/', imagesController_1.getAllImages);\n// GET /images/:id\nrouter.get('/:id', imagesController_1.getImageById);\n// POST /images\nrouter.post('/', upload.array('image'), imagesController_1.createImage);\n// DELETE /images/:id\nrouter.delete('/:id', imagesController_1.deleteImage);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://server/./src/routes/imagesRoutes.ts?");

/***/ }),

/***/ "./src/s3.ts":
/*!*******************!*\
  !*** ./src/s3.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n// Safely retrieve environment variables\nconst bucketName = process.env.AWS_BUCKET_NAME;\nconst region = process.env.AWS_REGION;\nconst accessKeyId = process.env.AWS_ACCESS_KEY || \"\";\nconst secretAccessKey = process.env.AWS_SECRET_KEY || \"\";\nconst s3 = new client_s3_1.S3Client({\n    region,\n    credentials: {\n        accessKeyId,\n        secretAccessKey\n    }\n});\nexports[\"default\"] = s3;\n\n\n//# sourceURL=webpack://server/./src/s3.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst app_1 = __importDefault(__webpack_require__(/*! ./app */ \"./src/app.ts\"));\ndotenv_1.default.config({ path: \"./.env\" });\nconst DB = process.env.DATABASE.replace(\"<password>\", process.env.DATABASE_PASSWORD);\nconst port = process.env.PORT || 3000;\nprocess.on(\"uncaughtException\", (err) => {\n    console.log(\"UNCAUGHT EXCEPTION! 💥 Shutting down...\");\n    console.log(err.name, err.message);\n    process.exit(1);\n});\nprocess.on(\"unhandledRejection\", (err) => {\n    console.log(\"UNHANDLED REJECTION! 💥 Shutting down...\");\n    console.log(err.name, err.message);\n    server.close(() => {\n        process.exit(1);\n    });\n});\nconst server = app_1.default.listen(port, () => {\n    console.log(`App running on port ${port}...`);\n    mongoose_1.default.connect(DB)\n        .then(() => console.log(\"DB connection successful!\"));\n});\n// console.log(process.env.DATABASE_PASSWORD);\n\n\n//# sourceURL=webpack://server/./src/server.ts?");

/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "@aws-sdk/s3-request-presigner":
/*!************************************************!*\
  !*** external "@aws-sdk/s3-request-presigner" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/s3-request-presigner");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-mongo-sanitize":
/*!*****************************************!*\
  !*** external "express-mongo-sanitize" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("express-mongo-sanitize");

/***/ }),

/***/ "express-rate-limit":
/*!*************************************!*\
  !*** external "express-rate-limit" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("express-rate-limit");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),

/***/ "hpp":
/*!**********************!*\
  !*** external "hpp" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("hpp");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "progress":
/*!***************************!*\
  !*** external "progress" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("progress");

/***/ }),

/***/ "xss-clean":
/*!****************************!*\
  !*** external "xss-clean" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("xss-clean");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;