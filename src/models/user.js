const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: String,
    required: true,
  },
  images: [
    {
      image: String,
      contentType: String,
      fileName: String,
    },
  ],
});

exports.User = mongoose.model("users", userSchema);
