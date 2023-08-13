import pkg from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";
import Producto from "../models/Productos.js";
import Clientes from "../models/Clientes.js";

config({ path: "variables.env" });

const { hash, compare, genSalt } = pkg;

const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre, apellido } = usuario;
  return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};

export const resolvers = {
  Query: {
    obtenerUsuario: async (_, { token }) => {
      return jwt.verify(token, process.env.SECRETA);
    },
    obtenerProductos: async () => {
      try {
        const result = await Producto.find();
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    obtenerProducto: async (_, { idProducto }) => {
      try {
        const result = await Producto.findById(idProducto);
        if (!result) {
          throw new Error("Producto no encontrado");
        }
        return result;
      } catch (error) {
        console.error(error);
      }
    },
  },

  Mutation: {
    nuevUsuario: async (_, { input }) => {
      const existeUsuario = await Usuario.findOne({ email: input.email });

      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
      }

      const salt = await genSalt(10);
      input.password = await hash(input.password, salt);

      try {
        const result = await Usuario.create(input);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;
      const existeUsuario = await Usuario.findOne({ email });

      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      const passwordCorrecto = await compare(password, existeUsuario.password);
      if (!passwordCorrecto) {
        throw new Error("El PASSWORD no es correctox");
      }

      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "24h"),
      };
    },
    nuevoProducto: async (_, { input }) => {
      try {
        const result = await Producto.create(input);
        return result;
      } catch (error) {
        console.error(error);
      }
    },
    //actualizarProducto(idProducto: ID!, input: ProductoInput!): Producto
    actualizarProducto: async (_, { idProducto, input }) => {
      try {
        return await Producto.findByIdAndUpdate(idProducto, input, {
          new: true,
        });
      } catch (err) {
        console.error(err);
      }
    },
    //eliminarProducto(idProducto: ID!): String
    eliminarProducto: async (_, { idProducto }) => {
      return await Producto.findByIdAndDelete(idProducto, { new: true });
    },

    //nuevoCliente(input: ClienteInput!): Cliente
    nuevoCliente: async (_, { input }) => {
      const { email } = input;
      const existeCliente = Clientes.findOne({ email });
      if (existeCliente) {
        throw new Error("El cliente ya esta registrado");
      }
      return await Clientes.create(input);
    },
  },
};
