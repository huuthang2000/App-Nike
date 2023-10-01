import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
  "User",
  new Schema({
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
      require: true, //not null
      validate: {
        validator: (value) => value.length > 3,
        message: "User must be at least 3 characters",
      },
    },
    email: {
      type: String,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect format",
      },
    },
    password: {
      //hashed/encrypted password
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (phoneNumber) =>
          phoneNumber.length > 5 && phoneNumber.length <= 50,
        message: "Phone number must be at least 5 characters, max: 50",
      },
    },
    address: {
      type: String,
      required: true,
    },
  })
);
