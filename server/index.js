const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorMiddleware } = require("./middleware/errorHandler");
const app = express();
require("dotenv").config();
const Port = process.env.PORT || 5000;
const toDoRoutes = require("./routes/toDoRoutes");

//enables server to understand json requests
app.use(express.json());

//makes server allow cross-origin
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.listen(Port, () => {
  console.log(`server started at port ${Port}`);
});

// Global Error Handling
app.use(errorMiddleware);

//routes
app.use("/api", toDoRoutes, errorMiddleware);
