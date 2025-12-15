

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import personsRoutes from "./routes/persons.routes.js";


const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI,{
    serverSelectionTimeoutMS: 30000, // <--- Aumenta el tiempo de espera de selección del servidor a 30 segundos
    bufferTimeoutMS: 30000,
  })

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Rutas API
app.use("/api/persons", personsRoutes);


export default app;