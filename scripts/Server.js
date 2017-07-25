
require('./DBconnection');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var User = mongoose.model('User');
var Project = mongoose.model('Project');

mongoose.Promise = global.Promise;
app.use('/', express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

var user;
var project;

app.post('/signup', function (req, res) {

    user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        photo: '../images/avatar.jpg',
        logedIn: true
    });

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

                this.user = user;

                res.sendFile(path.join(__dirname + '/../index.html'));
            }
        });

});

app.post('/projectAdd', function (req, res) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    project = new Project({
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo,
        category: req.body.category,
        created_at: date + " " + time,
        enddate: req.body.enddate,
        targetMoney:req.body.money,
        budget: 0,
        info: req.body.content,
        author: req.body.couserId,
        sharesPercenage: req.body.sharespercentage,
        numvisits: 0
    });

    project.save(function (err) {
        if(err)
            console.log("project saving error", err);
        else
            console.log("project successfuly saved");
    });

    res.sendFile(path.join(__dirname + '/../startproject.html'));

});

app.get('projectsList', function (req, res) {

    Project.find(function (err, projectlist) {
        if(err) console.log("Can't get projects list");
        else{
            var projectsjson = {
                projectlists : []
            };

            for(var i=0; i<projectlist.length; i++){
                var proj = projectlist[i];
                var uid = proj.author;
                var us = User.find({_id: uid});
                projectsjson.projectlists.push({
                    category: proj.category,
                    name: proj.name,
                    content: proj.info,
                    image: proj.photo,
                    owner: {
                        uId: uid,
                        name: us.name,
                        avatar: us.photo
                    }
                });
            }

            res.send(projectsjson);
        }
    });

});

app.listen(8080);