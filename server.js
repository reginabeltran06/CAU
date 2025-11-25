// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// ✅ Esquema del personal
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

const Personal = mongoose.model("Personal", PersonalSchema, "CAU");

// ✅ Endpoint para obtener personal
app.get("/api/personal", async (req, res) => {
  try {
    const personal = await Personal.find();
    res.json(personal);
  } catch (err) {
    console.error("Error en /api/personal:", err);
    res.status(500).json({ error: "Error al obtener el personal" });
  }
});

// ✅ WebSocket (Socket.IO) para actualizaciones en vivo
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado");
});

Personal.watch().on("change", () => {
  io.emit("update");
});

httpServer.listen(4000, () => console.log("✅ Servidor corriendo en puerto 4000"));
