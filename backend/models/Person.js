import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  nombre: String,
  edad: Number
});

const personSchema = new mongoose.Schema({
  nombre: String,
  fechaNacimiento: Date,
  telefono: String,
  correo: String,
  fechaIngreso: Date,
  casado: Boolean,
  hijos: [childSchema],
  foto: String, 
  turno: String
});

export default mongoose.model("Person", personSchema, "CAU");
