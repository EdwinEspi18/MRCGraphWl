import { Schema, model } from "mongoose";

const ProductosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  empresa: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  tel: {
    type: String,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  vendedor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

export default model("Clientes", ProductosSchema);
