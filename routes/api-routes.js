//Require models and passport
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    //Route for signing up User
    app.post("/api/signup", function(req, res) {
        db.User.create({
            email:req.body.email,
            password: req.body.password
        })
        .then(function() {
            res.redirect(307, "/api/login");
        })
        .catch(function(err) {
            res.status(401).json(err);
        });
    });

    //Route for getting data about our user
    app.get("/api/user_data", function(req, res) {
        if(!res.user) {
            res.json({});
        }else {
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
};