const mongoose = require("mongoose");

const userRolesSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"],
  },
});

module.exports = mongoose.model("userroles", userRolesSchema);
