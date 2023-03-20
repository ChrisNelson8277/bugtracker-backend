const express = require("express");
const dotenv = require("dotenv").config();
const port = 5000;
const cors = require("cors");
const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "bugtracker_db",
// });
const db = mysql.createConnection({
  host: "bugtracker-3db.czrt8kriox4u.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Bugtracker123!",
  database: "bugtracker_db",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected!");
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://admirable-licorice-3413e9.netlify.app/",
    ],
  })
);
app.get("/createtable", (req, res) => {
  let sql = "CREATE TABLE projects()";
});
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE bugtracker_db2";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database Created...");
  });
});
//GET REQUESTS
app.get("/get/users", (req, res) => {
  const user = require("./controllers/getUsersController");
  user.getUsers(req, res, db);
});

app.post("/get/project", (req, res) => {
  const project = require("./controllers/projectController");
  project.getProject(req, res, db);
});
app.post("/get/tickets", (req, res) => {
  const project = require("./controllers/projectController");
  project.getAllTickets(req, res, db);
});
app.post("/get/userTickets", (req, res) => {
  const project = require("./controllers/projectController");
  project.getUserTickets(req, res, db);
});
app.post("/get/adminTickets", (req, res) => {
  const project = require("./controllers/projectController");
  project.getAdminTickets(req, res, db);
});

app.get("/get/allprojects", (req, res) => {
  const project = require("./controllers/projectController");
  project.getAllProjects(req, res, db);
});
// UPDATE REQUESTS
app.post("/update/user", (req, res) => {
  const user = require("./controllers/updateController");
  user.updateUser(req, res, db);
});
app.post("/update/projectUsers", (req, res) => {
  const update = require("./controllers/updateController");
  update.updateProjectUsers(req, res, db);
});
app.post("/add/project", (req, res) => {
  const project = require("./controllers/projectController");
  project.addProject(req, res, db);
});
app.post("/edit/ticket", (req, res) => {
  const project = require("./controllers/projectController");
  project.editTicket(req, res, db);
});
app.post("/add/ticket", (req, res) => {
  const project = require("./controllers/projectController");
  project.addTicket(req, res, db);
});
app.post("/add/comment", (req, res) => {
  const project = require("./controllers/projectController");
  project.addComment(req, res, db);
});

app.post("/register", (req, res) => {
  const registerUser = require("./controllers/register");
  registerUser.handleNewUser(req, res, db);
});
app.post("/login", (req, res) => {
  const loginUser = require("./controllers/authController");
  loginUser.handleLogin(req, res, db);
});
app.post("/login/demo", (req, res) => {
  const loginUser = require("./controllers/authController");
  loginUser.handleDemoLogin(req, res, db);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
