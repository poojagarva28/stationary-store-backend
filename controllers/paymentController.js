const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");

//@desc create payment order
//@route POST /api/payment/orders
//@access public
const createOrder = asyncHandler(async (req, res) => {
  console.log(req);
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  const options = {
    amount: 50000, // amount in smallest currency unit
    currency: "INR",
    receipt: "receipt_order_123",
  };
  const order = await instance.orders.create(options);
  if (!order) return res.status(500).send("Some error occured");
  res.json(order);
});

module.exports = { createOrder };
