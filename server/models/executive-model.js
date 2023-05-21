const mongoose = require("mongoose");

const executiveModel = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    name: String,
    password: String,
    assignedQueries: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("executive", executiveModel);
