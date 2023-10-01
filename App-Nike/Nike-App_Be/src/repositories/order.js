import Exception from "../exception/Exception.js";
import { Order } from "../models/index.js";

const insertOrder = async ({
  items,
  subtotal,
  deliveryFee,
  total,
  customer,
}) => {
  // console.log("insert product")
  try {
    const order = await Order.create({
      items,
      subtotal,
      deliveryFee,
      total,
      customer,
    });
    return order;
  } catch (exception) {
    if (!!exception.errors) {
      //error from validation
      throw new Exception("Input error", exception.errors);
    }
  }
};

const getAllOrders = async ({ page, size, searchString }) => {
  // aggregate data for all student (Để lọc dữ liệu)
  page = parseInt(page);
  size = parseInt(size);
  // searchString? name, email, address contains searchString
  let filteredOrder = await Order.aggregate([
    {
      // $match chính là điều kiện để lọc dữ liệu
      $match: {
        // $or chính là mảng các điều kiện
        // $or: [
        //   {
        //     // `.*${searchString}.*` so ký tự  name phải chứa searchString
        //     // $options: "i" chính là không phân biệt chứ hoa chứ thường
        //     name: { $regex: `.*${searchString}.*`, $options: "i" }, // ignore case
        //   },
        // ],
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
  return filteredOrder;
};

const updateOrder = async ({
  _id,
  items,
  subtotal,
  deliveryFee,
  total,
  customer,
}) => {
  const order = await Order.findById(_id);
  order.items = items ?? order.items;
  order.subtotal = subtotal ?? order.subtotal;
  order.deliveryFee = deliveryFee ?? order.deliveryFee;
  order.total = total ?? order.total;
  order.customer = customer ?? order.customer;
  await order.save();
  return order;
};

const deleteOrder = async (orderId) => {
  const order_id = await Cart.findById(orderId);
  if (order_id) {
    const deleteOrder = Product.deleteOne(order_id);
    return deleteOrder;
  } else {
    throw new Exception("Cannot delete order with id " + orderId);
  }
};

export default {
  insertOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
