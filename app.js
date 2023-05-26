const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var arrayitem = [];

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        day: "numeric",
        weekday: "long",
        month: "long",
        year: "numeric",
    };
    var day = today.toLocaleDateString("en-in", options);

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
            newlistitems: arrayitem,
            error: "Please! Add a task",
        });
    } else {
        arrayitem.push(item);
        res.redirect("/");
    }
});

app.post("/delete-task", function (req, res) {
    let index = 0;
    let newArr = [];
    for (var i = 0; i < arrayitem.length; i++) {
        if (arrayitem[i] == req.body.task) {
            continue;
        }
        newArr.push(arrayitem[i]);
    }
    arrayitem = newArr;
    res.redirect("/");
});

app.listen(4000, function () {
    console.log("server started at port 4000");
});
