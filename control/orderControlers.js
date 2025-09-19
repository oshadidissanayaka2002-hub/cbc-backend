import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userControlers.js";

export async function createOrder(req, res) {
  // check user role properly
  if (!isCustomer(req)) {
    return res.status(401).json({
      message: "Please login as customer to create order",
    });
  }

  try {
    // get latest order
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

    let orderId;
    if (latestOrder.length === 0) {
      orderId = "CBC0001";
    } else {
      const currentOrderId = latestOrder[0].orderId;
      const numberString = currentOrderId.replace("CBC", "");
      const number = parseInt(numberString);
      const newNumber = (number + 1).toString().padStart(4, "0");
      orderId = "CBC" + newNumber;
    }

    const newOrderData = req.body;
    const newProductArray = [];

    for (let i = 0; i < newOrderData.orderItems.length; i++) {
      const productData = await Product.findOne({
        productId: newOrderData.orderItems[i].productId,
      });

      if (!productData) {
        return res.status(404).json({
          message:
            "Product with id " +
            newOrderData.orderItems[i].productId +
            " not found",
        });
      }

      newProductArray[i] = {
        name: productData.productName,
        productId: productData.productId,
        price: productData.price,
        quantity: newOrderData.orderItems[i].quantity,
        image: productData.images[0],
      };
    }

    console.log(newProductArray);

    // replace items
    newOrderData.orderItems = newProductArray;
    newOrderData.orderId = orderId;
    newOrderData.email = req.user.email;

    const order = new Order(newOrderData);
    await order.save();

    res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find({
      email: req.user.email,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
