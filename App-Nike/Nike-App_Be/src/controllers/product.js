import { MAX_RECORDS } from "../Global/contants.js";
import HttpStatusCode from "../exception/HttpStatusCode.js";
import { productRepository } from "../repositories/index.js";
async function getAllProducts(req, res) {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredProducts = await productRepository.getAllProducts({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get products successfully",
      size: filteredProducts.length,
      page,
      searchString,
      data: filteredProducts,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function getProductById(req, res) {
  let productId = req.params.id;

  try {
    const product = await productRepository.getDetailProduct(productId);
    res.status(HttpStatusCode.OK).json({
      message: "Get detail product successfully",
      data: product,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function deleteProductById(req, res) {
  let productId = req.params.id;
  try {
    const product = await productRepository.deleteProduct(productId);
    res.status(HttpStatusCode.OK).json({
      message: "Delete product successfully",
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function updateProduct(req, res) {
  //not validate !
  try {
    // const p = req.body;
    // console.log(p)
    const product = await productRepository.updateProduct(req.body);
    res.status(HttpStatusCode.OK).json({
      message: "Update product successfully",
      data: product,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}
async function insertProduct(req, res) {
  try {
    const product = await productRepository.insertProduct(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert product successfully",
      data: product,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot product student: " + exception,
      validationErrors: exception.validationErrors,
    });
  }
}

async function generateFakeStudents(req, res) {
  await studentRepository.generateFakeStudent(req.body);
  res.status(HttpStatusCode.INSERT_OK).json({
    message: "Insert student successfully",
  });
}

export default {
  insertProduct,
  updateProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
};
