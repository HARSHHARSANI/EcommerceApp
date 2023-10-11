import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  size: String,
  colour: String,
  Brand: String,
});
