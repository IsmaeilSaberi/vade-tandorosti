const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String },
  password: { type: String, required: true },
  id: { type: String },
});
module.exports = mongoose.model("User", userSchema);
