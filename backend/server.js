import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import personsRoutes from "./routes/persons.routes.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/persons", personsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
const path = require("path");

// Solo en producción
if (process.env.NODE_ENV === "production") {
  // Servir los archivos estáticos del build de React
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Para cualquier ruta que no coincida con la API, devolver index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}
