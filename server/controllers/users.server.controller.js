
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/user.server.model.js'),
    Section = require('../models/section.server.model.js'),
    passport = require('passport');

/*

router.route('/info')
  .get(users.info);

router.route('/timeline')
  .get(users.gettimeline)
  .post(users.updatetimeline);

router.route('/question/response')
  .post(users.response);

*/
// login functions
exports.google_login = function(res, req) {
  console.log("got to google login")
  passport.authenticate('google', { scope: 
    [ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] });
}

exports.google_callback = (res, req) => {
  passport.authenticate('google', {failureRedirect: '/Login'},
  function(res, req) {
    req.headers.Authorization = true;
  });
}

exports.facebook_login = function(res, req) {
  passport.authenticate('facebook');
}

exports.facebook_callback = (res, req) => {
  passport.authenticate('facebook', {failureRedirect: '/Login'},
  function(res, req) {
    req.headers.Authorization = true;
  });
}

exports.info = function(req, res) {
  var resp = req.user;
  resp.timeline = undefined;
  res.json(resp);
};

exports.gettimeline = function(req, res) {
  Section.find({}).exec((err, sections) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        var resp = {timeline:[]};
        for(var secti in req.user.timeline) {
          var sect = {
            sectionid: req.user.timeline[secti].sectionid
          };
          if(req.query.include_sections == 'true' || req.query.include_questions == 'true') {
            sect.sectiontitle = req.user.timeline[secti].sectiontitle;
            sect.sectionstartage = req.user.timeline[secti].sectionstartage;
            sect.sectionendage = req.user.timeline[secti].sectionendage;
            if(req.query.include_questions == 'true') {
              sect.questions = req.user.timeline[secti].questions;
              // we need to include potential new questions in a section
              var sectdef = null;
              for(var secti in sections) {
                if(sections[secti].sectionid == sect.sectionid) {
                  console.log('found section definition');
                  sectdef = sections[secti];
                  break;
                }
              }
              if(!sectdef) {
                res.status(400).send('Section with id ' + sect.sectionid + ' does not exist');
                return;
              }
              var questionsfield = [];
              for(var questi in sectdef.questions) {
                var quest = sectdef.questions[questi];
                quest = {questionid:quest.questionid, response:""};
                // Copy existing response
                if(sect.questions) {
                  for(var userquesti in sect.questions) {
                    if(sect.questions[userquesti].questionid == quest.questionid) {
                      quest.response = sect.questions[userquesti].response;
                      break;
                    }
                  }
                }
                questionsfield.push(quest);
              }
              sect.questions = questionsfield;
            }
          }
          resp.timeline.push(sect);
        }
        res.json(resp);
      }
    });
};

exports.updatetimeline = function(req, res) {
  Section.find({}).exec((err, sections) => {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        var timeline = [];
        for(var reqsecti in req.body.timeline) {
          var reqsect = req.body.timeline[reqsecti];
          var sect = null;
          console.log('searching for section with id ' + reqsect.sectionid);
          for(var secti in req.user.timeline) {
            if(req.user.timeline[secti].sectionid == reqsect.sectionid) {
              console.log('found that section in the user already');
              sect = req.user.timeline[secti];
              break;
            }
          }

          if(!sect) {
            console.log('did not find that section, using the one from the request');
            sect = reqsect;
          }

          if(reqsect.sectiontitle) sect.sectiontitle = reqsect.sectiontitle;
          if(reqsect.sectionstartage) sect.sectionstartage = reqsect.sectionstartage;
          if(reqsect.sectionendage) sect.sectionendage = reqsect.sectionendage;


          // Update section with info from section server if not present
          var sectdef = null;
          for(var secti in sections) {
            if(sections[secti].sectionid == sect.sectionid) {
              console.log('found section definition');
              sectdef = sections[secti];
              break;
            }
          }
          if(!sectdef) {
            res.status(400).send('Section with id ' + sect.sectionid + ' does not exist');
            return;
          }
          var questionsfield = [];
          for(var questi in sectdef.questions) {
            var quest = sectdef.questions[questi];
            quest = {questionid:quest.questionid, response:""};
            // Copy existing response
            if(sect.questions) {
              for(var userquesti in sect.questions) {
                if(sect.questions[userquesti].questionid == quest.questionid) {
                  quest.response = sect.questions[userquesti].response;
                  break;
                }
              }
            }
            questionsfield.push(quest);
          }
          sect.questions = questionsfield;



          console.log('pushing updated section');
          console.log(sect);

          timeline.push(sect);
        }

        console.log('new timeline: ');
        console.log(timeline);

        req.user.timeline = timeline;
        req.user.save(err => {
          if(err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).end();
          }
        });
      }
    });
};

exports.response = function(req, res) {
  var qid = req.body.questionid;
  var qresp = req.body.response;
  for(var secti in req.user.timeline) {
    for(var questi in req.user.timeline[secti].questions) {
      if(req.user.timeline[secti].questions[questi].questionid == qid) {
        console.log('found questionid, updating response');
        req.user.timeline[secti].questions[questi].response = qresp;
        req.user.save(err => {
          if(err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).end();
          }
        });
        return;
      }
    }
  }
  res.status(404).end();
};



/* 
  Middleware: find a user by its ID, then pass it to the next request handler. 
 */
exports.userFromId = function(req, res, next) {
  // req.userid should be set by auth code
  var userid = req.userid;

  User.findOne({userid:userid}).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
      console.log(err);
    } else {
      req.user = user;
      next();
    }
  });
};