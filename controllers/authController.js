const bcrypt = require("bcrypt");

const handleLogin = async (req, res, db) => {
  const { user, password } = req.body.information;
  console.log(req.body);
  let data = [];
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = db.query(
    "SELECT * FROM users Where email = ?",
    user,
    function (error, results, fields) {
      console.log(results[0]);
      if (error) {
        console.log(error);
        return res.sendStatus(401);
      } else if (results[0] !== undefined) {
        let user = {
          id: results[0].id,
          role: results[0].role,
          name: results[0].name,
          password: results[0].password,
        };
        data.push(user);
        checkUser();
      } else {
        return res.send({
          code: 401,
          error: "User does not exist!",
        });
      }
    }
  );
  const checkUser = async () => {
    if (!foundUser) return;
    const match = await bcrypt.compare(password, data[0].password);
    if (match) {
      console.log("matching pass");
      res.json({
        code: 200,
        success: `User ${user} is logged in`,
        role: data[0].role,
        name: data[0].name,
      });
    } else {
      res.sendStatus(401);
    }
  };
};

const handleDemoLogin = async (req, res, db) => {
  const { user, password } = req.body.information;
  console.log(req.body);
  let data = [];
  res.json({
    code: 200,
    success: `Demo Admin is logged in`,
    role: "admin",
    name: "Demo_Admin",
  });
};
module.exports = { handleLogin, handleDemoLogin };
