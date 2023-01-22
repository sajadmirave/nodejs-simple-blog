const app = require("./app");
const debug = require("debug")("http");
require("dotenv/config");

//with this pakage we can connect into mongodb database
const mongoose = require("mongoose");

//server
// read from .env file
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;

//connect to mongodb
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("database connected...");
    //create server
    app.listen(port, () => debug(`server is running on port ${port}`));
  })
  //catch error
  .catch((err) => console.log(err));
