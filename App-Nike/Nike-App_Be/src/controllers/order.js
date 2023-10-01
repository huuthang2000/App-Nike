import { MAX_RECORDS } from "../Global/contants.js";
import HttpStatusCode from "../exception/HttpStatusCode.js";
import { orderRepository } from "../repositories/index.js";
async function getAllOrders(req, res) {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredOrders = await orderRepository.getAllOrders({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get carts successfully",
      size: filteredOrders.length,
      page,
      searchString,
      data: filteredOrders,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function deleteOrderById(req, res) {
  let orderId = req.params.id;
  try {
    const order = await orderRepository.deleteOrder(orderId);
    res.status(HttpStatusCode.OK).json({
      message: "Delete order successfully",
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function updateOrder(req, res) {
  //not validate !
  try {
    // const p = req.body;
    // console.log(p)
    const order = await orderRepository.updateOrder(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Update order successfully",
      data: order,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function insertOrder(req, res) {
  try {
    const order = await orderRepository.insertOrder(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert order successfully",
      data: order,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot order product: " + exception,
      validationErrors: exception.validationErrors,
    });
  }
}


export default {
    insertOrder,
    updateOrder,
    getAllOrders,
    deleteOrderById
};
