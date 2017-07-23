
var mongoose = require('mongoose');
require('./DBconnection');
var User = mongoose.model('User');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup.js', function (req, res) {
    var uname = req.body.username;
    var umail = req.body.email;
    var upassword = req.body.password;

    var user = new User({
        username: uname,
        password: upassword,
        email: umail,
        photo: '../images/avatar.jpg',
        logedin: true
    });

    user.save(function (err) {
        if(err)
            console.log("user saving error");
        else
            console.log("user successfuly saved");
    });

    res.sendFile(path.join(__dirname + '../index.html'));

});