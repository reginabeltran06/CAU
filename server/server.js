// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL // AGREGAR EN RENDER
    ],
  })
);

app.use(express.json());

// Mongo connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI no definido en .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conexión:", err));

// Schema
const PersonalSchema = new mongoose.Schema({
  nombre: String,
  fechaNacimiento: Date,
  telefono: String,
  correo: String,
  fechaIngreso: Date,
  casado: Boolean,
  hijos: Number,
  foto: String,
});

const Personal = mongoose.model("Personal", PersonalSchema);

// API
app.get("/api/personal", async (req, res) => {
  try {
    const personal = await Personal.find().lean();
    res.json(personal);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el personal" });
  }
});

// Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
