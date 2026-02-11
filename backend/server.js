// server.js (o app.js)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import personsRoutes from "./routes/persons.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    bufferTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

mongoose.connection.on("connected", () => {
  console.log("DB:", mongoose.connection.name);
});

app.use("/api/persons", personsRoutes);

export default app;
