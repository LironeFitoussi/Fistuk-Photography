import express from "express";
import { getAllAlbums, getAlbumById, createAlbum, deleteAlbum } from "../controllers/albumsController";
const router = express.Router();

// GET /albums
router.get("/", getAllAlbums);

// GET /albums/:id
router.get("/:id", getAlbumById);

// POST /albums
router.post("/", createAlbum);

// DELETE /albums/:id
router.delete("/:id", deleteAlbum);


export default router;