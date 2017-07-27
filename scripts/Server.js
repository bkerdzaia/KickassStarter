
require('./DBconnection');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
const async = require("async");

var app = express();
var User = mongoose.model('User');
var Project = mongoose.model('Project');

mongoose.Promise = global.Promise;
app.use('/', express.static(__dirname + '/../'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

var user;
var project;

app.post('/signup', function (req, res) {

    user = new User({
        _id: toHex(req.body.email),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        photo: '../images/avatar.jpg',
        logedIn: true
    });

    user.save(function (err) {
        if(err){
            console.log("user saving error", err);
            res.redirect('/#/signup');
        } else {
            console.log("user successfuly saved");
            res.redirect('/');
        }
    });



});

app.post('/login', function (req, res) {
    User.findOne({email: req.body.email, password: req.body.password},
        function(err, usr) {
            if(err || !usr) res.redirect('/#/login');
            else{
                usr.logedIn = true;
                usr.save(function (err) {
                    if(err)
                        console.log("user saving error", err);
                    else
                        console.log("user successfuly saved");
                });

                user = usr;

                res.redirect('/');
            }
        });

});

app.post('/projectAdd', function (req, res) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    project = new Project({
        _id: toHex(date),
        name: req.body.name,
        description: req.body.description,
        photo: req.body.image,
        category: req.body.category,
        created_at: date + " " + time,
        enddate: req.body.endDate,
        targetMoney: req.body.money,
        Budget: 0,
        Info: req.body.content,
        author: req.body.userId,
        sharesPercenage: req.body.sharesPercenage,
        numVisits: 0
    });

    project.save(function (err) {
        if(err)
            console.log("project saving error", err);
        else
            console.log("project successfuly saved");
    });

    User.find({_id: req.body.userId}, function (err, usr) {
        if(err) console.log("can't find author");
        else{
            usr[0].createdProjects.push(toHex(date));
        }

        usr[0].save(function (err) {
            if(err) console.log("can't save updated user");
        });
    });

    res.redirect('/#/startproject');

});

app.get('/projectsList', function (req, res) {
    Project.find(async function (err, projectlist) {
        if(err || !projectlist.length) console.log("Can't get projects list");
        else{
            var projectsjson = {
                projectsList : []
            };
            for(var i=0; i<projectlist.length; i++){
                var proj = projectlist[i];
                var uid = proj.author;
                await User.find({_id: uid}, function (err, usr) {
                    if(err || !usr.length) console.log("can't get user");
                    else{
                        projectsjson.projectsList.push({
                            projectId: proj._id,
                            category: proj.category,
                            name: proj.name,
                            content: proj.Info,
                            image: proj.photo,
                            owner: {
                                uId: uid,
                                name: usr[0].username,
                                avatar: usr[0].photo
                            }
                        });
                        console.log(projectsjson.owner);
                    }
                });
            }
            console.log(projectsjson);
            res.send(projectsjson);
        }
    });

});

app.post('/profile', function (req, res) {
    var uid = req.body.userId;
    User.find({_id: uid}, function(err, usr){
        if(err || !usr) res.send("invalid userId", 404);
        else{
            res.send(usr);
        }
    });
});

app.get('/project', function (req, res) {
    var prId = req.body.projectId;
    console.log(prId);
    Project.find({_id: prId}, function (err, project) {
        if(err || !project) res.send("invalid projectID", 404);
        else{
            var projectjson = {
                project: Project,
                author: String,
                cofounders: []
            };
            projectjson.project = project[0];
            projectjson.author = project[0].author;
            var cofounderlist = project[0].cofounders;
            for(var i=0; i<cofounderlist.length; i++){
                var coId = cofounderlist[i];
                User.find({_id: coId}, function (err, usr) {
                    if(err || !usr) console.log("no user apeared");
                    else{
                        projectjson.cofounders.push({
                            cofounderId: coId,
                            cofounderName: usr[0].name
                        });
                    }
                });
            }

            res.send(projectjson);
        }
    });
});

app.get('/userId', function (req, res) {
    if(user) {
        res.send(user._id);
    } else {
        res.send(null);
    }
});

app.get('/logout', function (req, res) {
    user = null;
});

app.listen(8080);
