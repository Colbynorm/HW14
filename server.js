//Dependencies
var express = require("express");

//Setup Express app
var app = express();
var PORT = process.env.PORT || 8080;

//Require models
var db = require("./models");

//Setup Express to handle parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Static Directory
app.use(express.static("public"));

//Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

//Syncing sequelize models and starting express app
db.sequelize.sync({ force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});