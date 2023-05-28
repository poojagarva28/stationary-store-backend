const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const { createOrder } = require("../controllers/paymentController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
router.route("/orders").post(createOrder);

module.exports = router;
