import Exception from "../exception/Exception.js";
import { Product } from "../models/index.js";

const insertProduct = async ({
  image,
  images,
  name,
  price,
  size,
  description,
}) => {
  try {
    const product = await Product.create({
      image,
      images,
      name,
      price,
      size,
      description,
    });
    return product;
  } catch (error) {
    if (!!error.errors) {
      //error from validation
      throw new Exception("Input error", error.errors);
    }
  }
};

const getAllProducts = async ({ page, size, searchString }) => {
  page = parseInt(page);
  size = parseInt(size);
  let filteredProduct = await Product.aggregate([
    {
      // $match chính là dk để lọc dữ liệu
      $match: {
        //$or chính là mảng các điều kiện
        $or: [
          {
            // `.*${searchString}.*` so ký tự  name phải chứa searchString
            // $options: "i" chính là không phân biệt chứ hoa chứ thường
            name: { $regex: `.*${searchString}.*`, $option: "i" },
          },
          {
            description: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
        ],
      },
    },
    {
      // $skip chính là bỏ qua bao nhiu phần tử, (Trang 1 bỏ bao 0 phần từ, còn trang 2 sẽ bở qua n phần tử trang 1)
      $skip: (page - 1) * size,
    },
    {
      // $limit giới hạn bao nhiêu phần tử trong 1 trang
      $limit: size,
    },
  ]);
  return filteredProduct;
};

const getDetailProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Exception("Cannot find product with id " + productId);
  }
  return product;
};

const updateProduct = async ({
  _id,
  image,
  images,
  name,
  price,
  size,
  description,
}) => {
  const product = await Product.findById(_id);
  product.image = image ?? product.image;
  product.images = images ?? product.images;
  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.size = size ?? product.size;
  product.description = description ?? product.description;
  await product.save();
  return product;
};

const deleteProduct = async (productId) => {
  const product_id = await Product.findById(productId);
  if (product_id) {
    const deleteProduct = Product.deleteOne(product_id);
    return deleteProduct;
  } else {
    throw new Exception("Cannot delete product with id " + productId);
  }
};

export default {
  insertProduct,
  getDetailProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
