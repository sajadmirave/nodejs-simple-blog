const app = require("./app");
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
    app.listen(port, () => console.log(`server is running on port ${port}`));
  })
  //catch error
  .catch((err) => console.log(err));
