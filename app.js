const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var arrayitem = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
``
app.get("/", function (req, res) {

    var today = new Date();

    var options = {

        day: "numeric",
        weekday: "long",
        month: "long",
        year: "numeric",
        // timeZone: "IST",
    };

    var day = today.toLocaleDateString("en-in", options);
    // var day = today.toLocaleTimeString("en-US", options);

    res.render("list", { daytype: day, newlistitems: arrayitem});
});

app.post("/", function (req, res) 
{
    var item = req.body.newitems;
    arrayitem.push(item);
    res.redirect("/");
});

app.post("/delete-task", function(req, res) {
    let index = 0;
    let newArr = [];
    for(var i = 0; i < arrayitem.length; i++) {
        if (arrayitem[i] == req.body.task) {
            continue;
        }
        newArr.push(arrayitem[i]);
    }
    arrayitem = newArr;
    res.redirect("/");
})

app.listen(4000, function () {
    console.log("server started at port 4000");
});