const asyncHandler = require("express-async-handler");
const Test = require("../models/testModel");

//@desc Get all tests
//@route GET /api/tests
//@access private
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({
    user_id: req.user.id,
  });
  res.status(200).json(tests);
});

//@desc create tests
//@route POST /api/tests
//@access private
const createTest = asyncHandler(async (req, res) => {
  console.log("The body of the request", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const test = await Test.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(test);
});

//@desc get tests
//@route GET /api/tests/:id
//@access private
const getTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    res.status(404);
    throw new Error("No test found");
  }
  res.status(200).json(test);
});

//@desc update test
//@route PUT /api/tests/:id
//@access private
const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    res.status(404);
    throw new Error("No test found");
  }

  console.log(
    test.user_id.toString(),
    "------",
    req.user_id,
    "test.user_id.toString()"
  );

  if (test.user_id.toString() != req.user.id) {
    res.status(401);
    throw new Error("user dont have permission to update other user test");
  }

  const updatedTest = await Test.findByIdAndUpdate(
    req.params.id,
    req.body,

    {
      new: true,
    }
  );
  res.status(200).json(updatedTest);
});

//@desc Delete test
//@route GET /api/tests/:id
//@access private
const deleteTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) {
    res.status(404);
    throw new Error("No test found");
  }

  if (test.user_id.toString() != req.user.id) {
    res.status(401);
    throw new Error("user dont have permission to update other user test");
  }

  console.log("before remove", test);
  const deletedTest = await Test.deleteOne({ _id: test._id });
  console.log("after remove");
  res.status(200).json(deletedTest);
});

module.exports = {
  getTests,
  getTest,
  createTest,
  updateTest,
  deleteTest,
};
