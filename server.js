import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

///configure env
dotenv.config();

///database config
connectDB();

///rest objects
const app = express();

///middlewares
app.use(express.json());
app.use(morgan("dev"));

///routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO MERN STACK ECOMMERCE APP</h1>");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(
    `Server Running on mode ${process.env.DEV_MODE} on port ${port}`.bgCyan
      .white
  );
});
