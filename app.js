const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const secretKey = process.env.SECRET_KEY || "your-secret-key";

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: secretKey,
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

  var arrayitem = req.session.arrayitem || [];

  res.render("list", { daytype: day, newlistitems: arrayitem, error: null });
});

app.post("/add-task", function (req, res) {
  var item = req.body.newitems;

  if (item.trim() === "") {
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
      newlistitems: req.session.arrayitem || [],
      error: "Task cannot be empty",
    });
  } else {
    req.session.arrayitem = req.session.arrayitem || [];
    req.session.arrayitem.push(item);

    res.redirect("/");
  }
});

app.post("/delete-task", function (req, res) {
  var task = req.body.task;

  req.session.arrayitem = req.session.arrayitem.filter((item) => item !== task);

  res.redirect("/");
});

app.listen(4000, function () {
  console.log("server started at port 4000");
});
