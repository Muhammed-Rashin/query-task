const mongoose = require("mongoose");
const executiveModel = require("./executive-model");

const queryModel = new mongoose.Schema(
  {
    username: String,
    query: String,
    status: {
      type: String,
      default: "Pending",
    },
    answer: {
      type: String,
      default: "",
    },
    rating: Number,
    assignedExecutive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: executiveModel,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("query", queryModel);
