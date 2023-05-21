const repo = require("../repository/admin-repository");
module.exports = {
  getPendingQueries: async (req, res) => {
    try {
      let queries = await repo.getPendingQueries();
      res.send(queries);
    } catch (error) {
      console.log(error);
    }
  },

  getExecutives: async (req, res) => {
    try {
      let executives = await repo.getExecutives();
      res.send(executives);
    } catch (error) {
      console.log(error);
    }
  },

  assaignQuery: async (req, res) => {
    try {
      if (await repo.assaignQuery(req.body)) {
        res.send("Success");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
