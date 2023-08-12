import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: "variables.env" });

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la DB");
  } catch (error) {
    console.error(error);
    process.exit(1); // Detener la app
  }
};
