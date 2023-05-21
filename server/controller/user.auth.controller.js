const repo = require("../repository/user-repository");

module.exports = {
  //for testing
  test: (req, res) => {
    res.send("Server is running");
  },

  //for signup
  doSignup: async (req, res) => {
    try {
      await repo.doSignup(req.body);
      res.send("Success");
    } catch (error) {
      console.log(error);
    }
  },

  //   for login

  doLogin: async (req, res) => {
    try {
      const userDetails = await repo.doLogin(req.body);
      if (userDetails) res.send(userDetails);
      else res.send(false);
    } catch (error) {
      console.log(error);
    }
  },

  // for ask new query

  ask: async (req, res) => {
    try {
      if (await repo.askQuery(req.body)) res.send("Success");
      else res.send(false);
    } catch (error) {
      console.log(error);
    }
  },
  getAnswerdQueries: async (req, res) => {
    try {
      const queries = await repo.getAnswerdQueries();
      console.log(queries);
      res.send(queries);
    } catch (error) {
      console.log(error);
    }
  },
  rateAnswer: async (req, res) => {
    try {
      const queries = await repo.rateAnswer(req.body);
      res.send("Success");
    } catch (error) {
      console.log(error);
    }
  },
};
