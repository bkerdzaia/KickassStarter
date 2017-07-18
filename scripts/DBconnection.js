
var mongoose = require('mongoose');

var conn = mongoose.connect('mongodb://localhost/Startups', {
    useMongoClient: true
});


var Schema = mongoose.Schema;

var userSchema = Schema({
    username:{type: String, required: true},
    password:{type: String, required: true},
    email:{type: String, required: true},
    photo:{type: String, required: true},
    backedProjects:[{type: mongoose.Schema.Types.ObjectId, ref: 'Projects'}],
    createdProjects:[{type: mongoose.Schema.Types.ObjectId, ref: 'Projects'}]
});

var User = mongoose.model('User', userSchema);

var bla = new User({
    username: 'badura',
    password: '123456',
    email: 'badura@1.com',
    photo: 'badura.jpg'

});

console.log(bla.username);
module.exports = User;


var projectSchema = Schema({
    name:{type: String, required: true},
    description:{type: String},
    photo:{type: String},
    category:{type: String, required: true},
    created_at: Date,
    enddate: Date,
    targetMoney: Number,
    Budget: Number,
    Info:{type: String},
    author:{type: mongoose.Schema.Types.ObjectId, ref:User},
    cofounders:[{type: mongoose.Schema.Types.ObjectId, ref:User}]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;

