const repo = require("../repository/executive.repository");
module.exports = {
  addExecutive: async (req, res) => {
    try {
      let executive = await repo.addExecutive(req.body);
    } catch (error) {
      console.log(error);
    }
  },

  doLogin: async (req, res) => {
    try {
      let executive = await repo.doLogin(req.body);
      if (executive) res.send(executive);
      else res.send(false);
    } catch (error) {
      console.log(error);
    }
  },

  getAssignedQueries: async (req, res) => {
    try {
      const queries = await repo.getAssignedQueries(req.body);
      res.send(queries);
    } catch (error) {
      console.log(error);
    }
  },
  doAnswer: async (req, res) => {
    try {
      console.log(req.body);
      const response = await repo.doAnswer(req.body);
      if (response) res.send("Success");
      else res.send(false);
    } catch (error) {
      console.log(error);
    }
  },
};
