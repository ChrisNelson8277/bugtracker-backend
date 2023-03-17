const asyncHandler = require("express-async-handler");

const updateUser = asyncHandler(async (req, res, db) => {
  console.log(req.body.updateUser);
  const { id, role, name, number } = req.body.updateUser;
  const addProject = db.query(
    `UPDATE users SET role = ?,name =?,number =? WHERE id = ?`,
    [role, name, number, id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        console.log(results);
        res.send({
          code: 200,
          success: "added ticket",
        });
      }
    }
  );
});
const updateProjectUsers = asyncHandler(async (req, res, db) => {
  console.log(req.body.updateUser);
  const { id, assignedTo } = req.body.information;
  const assignedMembers = JSON.stringify(assignedTo);
  const addProject = db.query(
    `UPDATE projects SET assignedto = ? WHERE id = ?`,
    [assignedMembers, id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        console.log(results);
        res.send({
          code: 200,
          success: "added ticket",
        });
      }
    }
  );
});

module.exports = {
  updateUser,
  updateProjectUsers,
};
