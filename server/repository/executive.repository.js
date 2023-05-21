const userModel = require("../models/user-model");
const queryModel = require("../models/query-model");
const executiveModel = require("../models/executive-model");

module.exports = {
  addExecutive: async (data) => {
    try {
      const executiveSchema = new executiveModel(
        ({ email, name, password } = data)
      );
      return await executiveSchema.save();
    } catch (error) {
      console.log(error);
    }
  },

  doLogin: async ({ email, password }) => {
    try {
      const executive = await executiveModel.findOne({ email });
      if (executive) {
        if (executive.password === password) {
          return executive;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  },

  getAssignedQueries: async ({ id }) => {
    try {
      let queryIds = await executiveModel.findOne(
        { _id: id },
        { assignedQueries: 1, _id: 0 }
      );
      return await queryModel.find({
        _id: { $in: queryIds.assignedQueries },
        status: "Assigned",
      });
    } catch (error) {
      console.log(error);
    }
  },

  doAnswer: async ({ id, answer }) => {
    try {
      return await queryModel.updateOne(
        { _id: id },
        { answer, status: "Answerd" }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
