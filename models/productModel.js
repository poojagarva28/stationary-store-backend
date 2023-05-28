const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "Please add the product name"],
    },
    description: {
      type: String,
      required: [true, "Please add the product description"],
    },
    price: {
      type: Number,
      required: [true, "Please add the product price"],
    },
    category: {
      type: String,
      required: [true, "Please add the product category"],
      enum: ["office", "school", "drawing"],
    },
    quantity: {
      type: Number,
      default: 0,
      required: [true, "Please add the product quantity"],
    },
    image: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
    attributes: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
    // reviews: {
    //     reviewer: String,
    //     rating: Number,
    //     comment: String
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
