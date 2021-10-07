require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const category = require("./routes/category");
const product = require("./routes/product");
var bodyParser = require("body-parser");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require("./DB/mongoose");
const Port = 8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ROUTES ******
app.use("/app", auth);
app.use("/app/admin", admin);

app.use("/app", category);

app.use("/app", product);

app.listen(Port, () => {
  console.log(`Nodejs Server is running on Port no =>  ${Port}`);
});
