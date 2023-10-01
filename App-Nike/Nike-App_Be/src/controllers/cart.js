import { MAX_RECORDS } from "../Global/contants.js";
import HttpStatusCode from "../exception/HttpStatusCode.js";
import { cartRepository } from "../repositories/index.js";
async function getAllCarts(req, res) {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredCarts = await cartRepository.getAllCarts({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get carts successfully",
      size: filteredCarts.length,
      page,
      searchString,
      data: filteredCarts,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function deleteCartById(req, res) {
  let cartId = req.params.id;
  try {
    const cart = await cartRepository.deleteCart(cartId);
    res.status(HttpStatusCode.OK).json({
      message: "Delete cart successfully",
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function updateCart(req, res) {
  //not validate !
  try {
    // const p = req.body;
    // console.log(p)
    const cart = await cartRepository.updateCart(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Update cart successfully",
      data: order,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function insertCart(req, res) {
  try {
    const cart = await cartRepository.insertCart(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert cart successfully",
      data: cart,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot cart student: " + exception,
      validationErrors: exception.validationErrors,
    });
  }
}


export default {
    insertCart,
    updateCart,
    getAllCarts,
    deleteCartById
};
