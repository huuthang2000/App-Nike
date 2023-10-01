import mongoose, { Schema, ObjectId } from "mongoose";
export default mongoose.model(
  "Order",
  new Schema({
    id: {
      type: ObjectId,
    },
    items: {
      type: Array,
      required: true,
    },

    subtotal: {
      //hashed/encrypted password
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    customer: {
      type: Object,
      required: true,
    },
  })
);
