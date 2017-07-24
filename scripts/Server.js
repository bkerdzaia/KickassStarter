
require('./DBconnection');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var User = mongoose.model('User');

mongoose.Promise = global.Promise;
app.use('/', express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

var user;
app.post('/signup', function (req, res) {

    user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        photo: '../images/avatar.jpg',
        logedIn: true
    });

    console.log(user);

    user.save(function (err) {
        if(err)
            console.log("user saving error", err);
        else
            console.log("user successfuly saved");
    });

    res.sendFile(path.join(__dirname + '/../index.html'));

});

app.post('/login', function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password},
        function(err, user) {
        if(err) res.send("Incorrect email or password");
        else{
            user.logedIn = true;
            user.save(function (err) {
                if(err)
                    console.log("user saving error", err);
                else
                    console.log("user successfuly saved");
            });

            res.sendFile(path.join(__dirname + '/../index.html'));
        }
    });

});

app.listen(8080);
