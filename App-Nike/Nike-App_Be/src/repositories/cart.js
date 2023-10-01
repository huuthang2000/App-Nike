import Exception from "../exception/Exception.js";
import { Cart } from "../models/index.js";

const insertCart = async ({
  image,
  name,
  price,
  size,
  quantity,
}) => {
  // console.log("insert product")
  try {
    const cart = await Cart.create({
      image,
      name,
      price,
      size,
      quantity,
    });
    return cart;
  } catch (exception) {
    if (!!exception.errors) {
      //error from validation
      throw new Exception("Input error", exception.errors);
    }
  }
};

const getAllCarts = async ({ page, size, searchString }) => {
  // aggregate data for all student (Để lọc dữ liệu)
  page = parseInt(page);
  size = parseInt(size);
  // searchString? name, email, address contains searchString
  let filteredCart = await Cart.aggregate([
    {
      // $match chính là điều kiện để lọc dữ liệu
      $match: {
        // $or chính là mảng các điều kiện
        $or: [
          {
            // `.*${searchString}.*` so ký tự  name phải chứa searchString
            // $options: "i" chính là không phân biệt chứ hoa chứ thường
            name: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
          },
          
        ],
      }, // get All Student
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
  return filteredCart;
};


const updateCart = async ({
  _id,
  image,
  name,
  price,
  size,
  quantity,
}) => {
  const cart = await Cart.findById(_id);
  cart.image = image ?? cart.image;
  cart.name = name ?? cart.name;
  cart.price = price ?? cart.price;
  cart.size = size ?? cart.size;
  cart.quantity = quantity ?? cart.quantity;
  await cart.save();
  return cart;
};

const deleteCart = async (cartId) => {
  const cart_id = await Cart.findById(cartId);
  if (cart_id) {
    const deleteCart = Product.deleteOne(cart_id);
    return deleteCart;
  } else {
    throw new Exception("Cannot delete cart with id " + orderId);
  }
};

export default {
  insertCart,
  getAllCarts,
  updateCart,
  deleteCart,
};
