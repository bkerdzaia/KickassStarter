
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
require('./DBconnection');
var User = mongoose.model('User');
var bodyParser = require('body-parser');

app.use('/', express.static(__dirname + '/../'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

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
	console.log("requ: ", req.body);

});

app.listen(8080);
