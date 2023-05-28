const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateToken = require("../middleware/validateTokenHandler");
const upload = require("../middleware/multer");

router.use(validateToken);
router
  .route("/")
  .get(getAllProducts)
  .post(upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

module.exports = router;
