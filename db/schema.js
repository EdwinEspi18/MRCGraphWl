export const typeDefs = `#graphql

# Interfaces

type Usuario {
  id:ID
  nombre: String
  apellido: String
  email: String
  creado: String
}
type Producto {
  id: ID
  nombre: String
  existencia: Int
  precio: Float
  creado: String
}
type Token {
  token: String
}
type Cliente {
  id: ID
  nombre: String
  apellido: String
  empresa: String
  email: String
  tel: String
  vendedor: ID

}
# Inputs

input UsuarioInput {
  nombre: String!
  apellido: String!
  email: String!
  password: String!
}
input ProductoInput {
  nombre: String!
  existencia: Int!
  precio: Float!
}
input AutenticarInput {
  email: String!
  password: String!
}
input ClienteInput {
  nombre: String!
  apellido: String!
  empresa: String!
  email: String!
  tel: String
  vendedor: ID!
}

# Querys y Mutations

type Query {
  # Usuarios
  obtenerUsuario(token: String!) : Usuario

  # Productos
  obtenerProductos: [Producto]
  obtenerProducto(idProducto: ID!): Producto
}
type Mutation {
  # Usuarios
  nuevUsuario(input: UsuarioInput!): Usuario
  autenticarUsuario(input: AutenticarInput): Token

  # Productos
  nuevoProducto(input: ProductoInput!): Producto
  actualizarProducto(idProducto: ID!, input: ProductoInput!): Producto
  eliminarProducto(idProducto: ID!): Producto

  # Clientes
  nuevoCliente(input: ClienteInput!): Cliente
}
`;
