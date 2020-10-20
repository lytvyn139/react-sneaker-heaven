import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// (Create new order)PUBLIC|POST|/api/orders
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.lenght === 0) {
    res.status(400);
    throw new Error("no order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id, //attaching loged in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
