const bcrypt = require("bcrypt");

const handleNewUser = async (req, res, db) => {
  console.log(req.body.information);
  const { user, password, first, last } = req.body.information;
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  let users = {
    role: "user",
    name: user,
    email: req.body.information.email,
    number: req.body.information.number,
    password: encryptedPassword,
  };
  let foundUsers = [];
  const foundUser = db.query(
    "SELECT * FROM users Where email = ?",
    users.email,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        return res.sendStatus(401);
      } else if (results[0] === undefined) {
        console.log(results[0], "yay ya");
        insertUser();
      } else {
        res.json({
          error: "user already exists",
        });
      }
    }
  );

  const insertUser = () => {
    if (!foundUsers.name) {
      db.query(
        "INSERT INTO users SET ?",
        users,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res.send({
              code: 400,
              failed: "error occurred",
              error: error,
            });
          } else {
            res.send({
              code: 200,
              success: "user registered successfully",
              role: users.role,
              name: users.name,
            });
          }
        }
      );
    }
  };
};

module.exports = { handleNewUser };
