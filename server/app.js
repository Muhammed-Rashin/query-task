const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//Configuring database with mongoose
mongoose.connect(process.env.DATABASE_URL);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind connection to success event (to print success message)
db.once("open", function () {
  console.log("MongoDB Connected Successfully");
});

const userRoute = require("./routes/user-route");
const adminRoute = require("./routes/admin-route");
const executiveRoute = require("./routes/executive-route");

app.use(
  cors({
    origin: process.env.allowedOrigin,
    credentials: true,
  })
);
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/executive", executiveRoute);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);
