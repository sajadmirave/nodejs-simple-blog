const mongoose = require("mongoose");

const userScema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true, // for deleting empty space
    unique: true, // email shabih be ham ro nmigire
  },
  password: {
    type: String,
    required: true,
    trim: true,

    // set min max for password
    min: 4,
    max: 12,
  },

  joinDate: {
    type: Date,
    default: Date.now,
  },
});

// create collection in mongodb
//model = collection
const User = mongoose.model("User", userScema);

module.exports = User;
