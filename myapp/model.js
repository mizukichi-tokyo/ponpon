var mongoose = require('mongoose');
var url = 'mongodb://'+process.env.MONGO_1_PORT_27017_TCP_ADDR+':27017/user';
var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

var UserSchema = new mongoose.Schema({
    email    : { type: String, unique: true },
    password  : String
},{collection: 'info'});


var ProjectSchema = new mongoose.Schema({
    email    : String,
    project  : { type: String, unique: true }
},{collection: 'projectList'});

var QuestionSchema = new mongoose.Schema({
    projectId    : String,
    sentence : String,
    type : String,
    choice1 : String,
    choice2 : String,
    choice3 : String,
    choice4 : String,
},{collection: 'questionList'});


exports.User = db.model('User', UserSchema);
exports.Project = db.model('Project', ProjectSchema);
exports.Question = db.model('Question', QuestionSchema);
