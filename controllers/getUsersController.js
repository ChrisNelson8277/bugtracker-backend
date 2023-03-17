const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res, db) => {
  let users = [];
  db.query("SELECT * FROM users", function (error, results, fields) {
    console.log(results);
    if (error) {
      return res.send({ message: "something went wrong" });
    } else {
      for (var a = 0; a < results.length; a++) {
        var userData = results[a];
        delete userData.password;
      }
      res.status(200).json(results);
    }
  });
});

module.exports = {
  getUsers,
};
