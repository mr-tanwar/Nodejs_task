const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//APP constants

const { DB_URL, PORT } = require("./config.js");

// Intializing the application
const app = express();

// Adding Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Adding Routes

app.use("/api/users", require("./routes/usersRoute"));

//Making Connection with Database

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Database Connected Successfully "))
  .catch((error) =>
    console.log("Database connection failed. Error msg= ", error)
  );

app.listen(PORT, () => console.log(`Server listening on PORT= ${PORT}`));
