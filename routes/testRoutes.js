const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const {
  getTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTests).post(createTest);
router.route("/:id").get(getTest).put(updateTest).delete(deleteTest);

module.exports = router;
