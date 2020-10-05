const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Load environment settings
dotenv.config({ path: "./config.env" });

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// * Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Use Routes
//* Auth Routes *//
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//* Product Routes *//
app.use("/api/product", require("./routes/api/product"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
