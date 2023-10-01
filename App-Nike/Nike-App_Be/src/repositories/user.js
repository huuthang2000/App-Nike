import { User } from "../models/index.js";
import Exception from "../exception/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async ({ email, password, name, phoneNumber, address }) => {
  //validation already done
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  return { ...newUser._doc, password: "*********" };
};
const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!!isMatch) {
      const token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        {
          //expiresIn: "60" //1minute
          expiresIn: "1 days",
        }
      );
      return {
        ...existingUser.toObject(),
        password: "********",
        token: token,
      };
    }
  }
};
export default {
    register, login
}