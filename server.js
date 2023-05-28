const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT || 6000;

app.use(express.json());
app.use("/api/tests", require("./routes/testRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
