const userModel = require("../models/user-model");
const queryModel = require("../models/query-model");
const executiveModel = require("../models/executive-model");

module.exports = {
  getPendingQueries: async () => {
    try {
      return await queryModel.find({ status: "Pending" });
    } catch (error) {
      console.log(error);
    }
  },
  getExecutives: async () => {
    try {
      return await executiveModel.find();
    } catch (error) {
      console.log(error);
    }
  },
  assaignQuery: async ({ queryId, executiveId }) => {
    try {
      await queryModel.updateOne(
        { _id: queryId },
        { status: "Assigned", assignedExecutive: executiveId }
      );
      await executiveModel.updateOne(
        { _id: executiveId },
        { $addToSet: { assignedQueries: queryId } }
      );
      return true;
    } catch (error) {
      console.log(error);
    }
  },
};
