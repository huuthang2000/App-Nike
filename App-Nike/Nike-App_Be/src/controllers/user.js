import { validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import HttpStatusCode from "../exception/HttpStatusCode.js";
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
};

const register = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;
  
    try {
      const user = await userRepository.register({
        name,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(HttpStatusCode.INSERT_OK).json({
        message: "Register user successfully",
        data: user,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  
  export default {
      login, register
  }
