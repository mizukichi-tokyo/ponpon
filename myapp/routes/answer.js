var express = require('express');
var router = express.Router();
var model = require('../model');
var Project = model.Project;
var Question = model.Question;

router.index = function(req, res){
  var project = '';
  Project.findOne({'_id' : req.query.id}, function(err, doc) {
                if (err) {console.log(err);}
                project = doc.project;
        });

  Question.where('projectId').equals(req.query.id).exec(function(err, docs) {
        if (err){
                console.log(err);
        }
        res.render('answer', {
                user : req.session.user,
                projectId : req.query.id,
                project : project,
                docs : docs
        });
    });
};

router.makeQuestion = function(req, res){
  var newQuestion = new Question({
      'sentence': req.body.sentence,
      'projectId' : req.body.projectId,
      'type' : req.body.type,
      'choice1' : req.body.choice1,
      'choice2' : req.body.choice2,
      'choice3' : req.body.choice3,
      'choice4' : req.body.choice4,
  });

    newQuestion.save(function(err){
      if(err){
          if (err.code === 11000) {
              console.log("the question name is already used");
          }
          else {
              console.log(err);
          }
          res.redirect('back');
      }else{
            console.log("make question success and redirect to '/questions'");
            res.redirect('/questions?id='+ req.body.projectId );
        }
    });
};
module.exports = router;
