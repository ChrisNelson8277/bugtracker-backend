const asyncHandler = require("express-async-handler");
const moment = require("moment");

const addProject = asyncHandler(async (req, res, db) => {
  console.log(req.body);
  let project = {
    name: req.body.information.name,
    description: req.body.information.description,
    assignedto: JSON.stringify(req.body.information.assignedto),
  };
  console.log(project.assignedto);
  const addProject = db.query(
    "INSERT INTO projects SET ?",
    project,
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
          success: "added project",
        });
      }
    }
  );
});
const updateProject = asyncHandler(async (req, res) => {
  const menu = await getMenu.find();
  res.status(200).json({});
});
const getAllProjects = asyncHandler(async (req, res, db) => {
  const getProject = db.query(
    "SELECT * FROM projects",
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
          results: results,
        });
      }
    }
  );
});
const getAdminTickets = asyncHandler(async (req, res, db) => {
  console.log(req.body);
  const getProject = db.query(
    "SELECT * FROM tickets",
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
          results: results,
        });
      }
    }
  );
});
const getUserTickets = asyncHandler(async (req, res, db) => {
  console.log(req.body);
  const getProject = db.query(
    "SELECT * FROM tickets WHERE author = ?",
    [req.body.author],
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
          results: results,
        });
      }
    }
  );
});
const getAllTickets = asyncHandler(async (req, res, db) => {
  const getProject = db.query(
    "SELECT * FROM tickets WHERE id = ?",
    req.body.id,
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
          results: results,
        });
      }
    }
  );
});
const getProject = asyncHandler(async (req, res, db) => {
  let projectId = {
    id: req.body.information.id,
  };
  console.log(projectId.id);
  const getProjects = db.query(
    "SELECT * FROM projects WHERE id = ?",
    projectId.id,
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
          results: results,
          tickets: JSON.parse(results[0].tickets),
          members: JSON.parse(results[0].assignedto),
        });
      }
    }
  );
});

const addTicket = asyncHandler(async (req, res, db) => {
  const {
    title,
    description,
    priority,
    status,
    type,
    id,
    author,
    assignedTo,
    projectName,
  } = req.body.information;
  console.log(assignedTo);
  let project = {
    id: id,
    project_name: projectName,
    title: title,
    author: author,
    description: description,
    assignedmembers: JSON.stringify(assignedTo),
    status: status,
    priority: priority,
    type: type,
  };
  let projects = JSON.stringify(project);
  const addProject = db.query(
    `INSERT INTO tickets set ?`,
    project,
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

const addComment = asyncHandler(async (req, res, db) => {
  const { id, commentId, date, comment, author } = req.body;
  let project = {
    commentId: commentId,
    author: author,
    comment: comment,
    time: moment().format("h:mm:ss a"),
    date: moment().format("MMMM Do YYYY"),
  };
  let projects = JSON.stringify(project);
  const addProject = db.query(
    `UPDATE tickets SET comments = JSON_ARRAY_INSERT(comments, '$[0]', '${projects}') WHERE ticket_id = ?`,
    [id],
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
const editTicket = asyncHandler(async (req, res, db) => {
  const { title, description, assignedTo, priority, status, type, ticketId } =
    req.body.information;
  console.log(ticketId, assignedTo);
  const addProject = db.query(
    `UPDATE tickets SET title = ?, description = ?, assignedmembers = ?, type = ?, status = ?, priority = ?
    WHERE ticket_id = ?`,
    [
      title,
      description,
      JSON.stringify(assignedTo),
      type,
      status,
      priority,
      parseInt(ticketId),
    ],
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
  addProject,
  updateProject,
  getAllProjects,
  getProject,
  addTicket,
  getAllTickets,
  getUserTickets,
  addComment,
  editTicket,
  getAdminTickets,
};
