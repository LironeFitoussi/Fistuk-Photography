import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE!.replace(
  "<password>",
  process.env.DATABASE_PASSWORD!
);

const port = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  mongoose.connect(DB)
    .then(() => console.log("DB connection successful!"));
});

// console.log(process.env.DATABASE_PASSWORD);
