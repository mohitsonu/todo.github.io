const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };
  var day = today.toLocaleDateString("en-in", options);

  if (!req.session.taskList) {
    req.session.taskList = [];
  }

  res.render("list", { daytype: day, newlistitems: req.session.taskList });
});

app.post("/add-task", function (req, res) {
  var item = req.body.newitems;

  if (item.trim() === "") {
    // Handle empty task error
    var today = new Date();
    var options = {
      day: "numeric",
      weekday: "long",
      month: "long",
      year: "numeric",
    };
    var day = today.toLocaleDateString("en-in", options);

    res.render("list", {
      daytype: day,
      newlistitems: req.session.taskList,
      error: "Task cannot be empty",
    });
  } else {
    req.session.taskList.push(item);
    res.redirect("/");
  }
});

app.post("/delete-task", function (req, res) {
  let task = req.body.task;
  let taskList = req.session.taskList;

  let index = taskList.indexOf(task);
  if (index > -1) {
    taskList.splice(index, 1);
  }

  res.redirect("/");
});

app.listen(4000, function () {
  console.log("Server started at port 4000");
});
