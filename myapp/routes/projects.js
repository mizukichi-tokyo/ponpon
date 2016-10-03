var express = require('express');
var router = express.Router();
var model = require('../model');
var Project = model.Project;

router.index = function(req, res){
  Project.where('email').equals(req.session.user).exec(function(err, docs) {
        if (err){
                console.log(err);
        }
        res.render('projects', {
                user : req.session.user,
                docs : docs
        });
    });
};

router.makeProject = function(req, res){
  var newProject = new Project({
      'project': req.body.project,
      'email': req.session.user
  });

    newProject.save(function(err){
      if(err){
          if (err.code === 11000) {
              console.log("the project name is already used");
          }
          else {
              console.log(err);
          }
          res.redirect('back');
      }else{
            console.log("make project success and redirect to '/projects'");
            res.redirect('/projects');
        }
    });
};
module.exports = router;
