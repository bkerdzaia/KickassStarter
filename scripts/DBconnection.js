var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Startups', {
    useMongoClient: true
});


var Schema = mongoose.Schema;

var userSchema = Schema({
    _id: String,
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    photo: {type: String, required: true},
    logedIn:{type:Boolean, required: true},
    backedProjects: [{type: String, ref: 'Projects'}],
    createdProjects: [{type: String, ref: 'Projects'}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;

var projectSchema = Schema({
    _id: String,
    name:{type: String, required: true},
    description:{type: String},
    photo:{type: String},
    category:{type: String, required: true},
    created_at: Date,
    enddate: Date,
    targetMoney: Number,
    Budget: Number,
    Info:{type: String},
    author:{type: String, ref:User},
    cofounders:[{id: String, money: Number}],
    sharesPercenage: Number,
    numVisits: Number
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
