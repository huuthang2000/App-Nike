import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "Cart",
  new Schema({
    id: {
      type: ObjectId,
    },
    image: {
      type: String,
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
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  })
);
