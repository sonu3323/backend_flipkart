const mongoose = require("mongoose");

const databse_url = process.env.DATABASE;

mongoose
  .connect(databse_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB IS CONNECTED SUCCESSFULLY"))
  .catch((err) => console.log("DB IS NOT CONNECTED , SOMETING WENT WRING!!"));
