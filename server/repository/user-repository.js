const userModel = require("../models/user-model");
const queryModel = require("../models/query-model");
const executiveModel = require("../models/executive-model");
const bcrypt = require("bcrypt");

module.exports = {
  doSignup: async (data) => {
    try {
      data.password = await bcrypt.hash(data.password, 10);
      const userSchema = new userModel(({ email, password } = data));
      await userSchema.save();
    } catch (error) {
      console.log(error);
    }
  },
  doLogin: async (data) => {
    try {
      const user = await userModel.findOne({ email: data.email });
      if (user) {
        if (await bcrypt.compare(data.password, user.password)) {
          return user;
        }
      } else return false;
    } catch (error) {
      console.log(error);
    }
  },

  askQuery: async (data) => {
    try {
      const querySchema = new queryModel(({ username, query } = data));
      return await querySchema.save();
    } catch (error) {
      console.log(error);
    }
  },
  getAnswerdQueries: async (data) => {
    try {
      return await queryModel.find({ status: "Answerd" }).populate('assignedExecutive');
    } catch (error) {
      console.log(error);
    }
  },
  rateAnswer: async ({ id, rating }) => {
    try {
      return await queryModel.updateOne({ _id: id }, { rating });
    } catch (error) {
      console.log(error);
    }
  },
};
