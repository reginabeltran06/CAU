// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI no definido en .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch((err) => {
    console.error("❌ Error de conexión a MongoDB:", err);
  });

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

// Endpoints API
app.get("/api/personal", async (req, res) => {
  try {
    const personal = await Personal.find().lean();
    res.json(personal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el personal" });
  }
});

// Serve client build in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
