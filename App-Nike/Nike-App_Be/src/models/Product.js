import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "Products",
  new Schema({
    id: {
      type: ObjectId,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true, //not null
    },

    price: {
      //hashed/encrypted password
      type: Number,
      required: true,
    },
    size: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
);
