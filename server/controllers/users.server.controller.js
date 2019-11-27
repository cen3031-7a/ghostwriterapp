
/* Dependencies */
var mongoose = require('mongoose'), 
    User = require('../models/user.server.model.js'),
    Section = require('../models/section.server.model.js');
const PDFDocument = require('pdfkit');
const officegen = require('officegen');
const fs = require('fs');
  

/*

router.route('/info')
  .get(users.info);

router.route('/timeline')
  .get(users.gettimeline)
  .post(users.updatetimeline);

router.route('/question/response')
  .post(users.response);

*/

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
        console.log(req.user);
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

findSection = function(allsections, sectionid) {
  for(var secti in allsections) {
    if(allsections[secti].sectionid == sectionid) {
      return allsections[secti];
    }
  }
  console.log('uh oh. findsection section ' + sectionid + ' not found');
  return null;
};

findQuestion = function(allsections, sectionid, questionid) {
  for(var secti in allsections) {
    var sect = allsections[secti];
    if(sectionid == null || sect.sectionid == sectionid) {
      for(var questi in sect.questions) {
        if(sect.questions[questi].questionid == questionid) {
          return sect.questions[questi];
        }
      }
    }
  }
  console.log('uh oh. findquestion question ' + questionid + ' not found');
  return null;
};

exports.genPDF = function(req, res) {
  var user = req.user;
  var timeline = user.timeline;
  var include_questions = req.query.include_questions == 'true';

  Section.find({}).exec((err, allsections) => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {


      var options = {};
      options.ownerPassword = 'akjhsdkjahdw';
      options.permissions = {};
      options.permissions.copying = false;
      options.permissions.printing = 'highResolution';
      const doc = new PDFDocument(options);
      doc.info.Title = "My Story";
      doc.info.Author = "Ghost Writer App";

      res.setHeader("content-type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="My Story.pdf"');
      doc.pipe(res);

      var username = user.firstname + " " + user.lastname;
      doc.fontSize(48).font('Times-Roman');
      doc.text(`${username}'s Story`, {align:'center'});

      for(var secti in timeline) {
        var section = timeline[secti];
        var sectiondat = findSection(allsections, section.sectionid);

        var sectiontitle = section.sectiontitle;
        if(!sectiontitle) sectiontitle = sectiondat.sectionname;
        doc.fontSize(24);
        doc.text(`\n${sectiontitle}`);

        var sectionstartage = section.sectionstartage;
        var sectionendage = section.sectionendage;
        doc.fontSize(11).fillColor('#575757');
        if(sectionstartage && !sectionendage) {
          doc.text(`Starting at ${sectionstartage} years old`);
        } else if(!sectionstartage && sectionendage) {
          doc.text(`Ending at ${sectionendage} years old`);
        } else if(sectionstartage && sectionendage) {
          doc.text(`From ${sectionstartage} to ${sectionendage} years old`);
        }
        doc.fillColor('#000000');


        doc.fontSize(12);
        doc.font('Times-Roman').text('\n');

        for(var questi in section.questions) {
          var question = section.questions[questi];
          var response = question.response;
          if(response) {
            var questiondat = findQuestion(allsections, section.sectionid, question.questionid);

            if(include_questions) {
              var questiontext = questiondat.question;
              doc.fontSize(16).text(`${questiontext}`);
              doc.fontSize(12);
            }

            doc.text(`${response}`);
            doc.text('\n');
          }
        }

      }

      doc.end();


    }
  });
};

exports.genDOCX = function(req, res) {
  var user = req.user;
  var timeline = user.timeline;
  var include_questions = req.query.include_questions == 'true';

  Section.find({}).exec((err, allsections) => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {


      const doc = officegen('docx');
      doc.on('error', function(err) {
        console.log(err);
      });
      res.setHeader("content-type", "application/application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      res.setHeader("Content-Disposition", 'attachment; filename="My Story.docx"');
      var style = {
        font_face: 'Times-Roman',
        font_size: 48,
        color: '000000',
        align: 'center'
      };
      var pobj = doc.createP();

      var username = user.firstname + " " + user.lastname;
      pobj.addText(`${username}'s Story`, Object.assign({}, style));

      style.align = 'left';

      for(var secti in timeline) {
        var section = timeline[secti];
        var sectiondat = findSection(allsections, section.sectionid);

        var sectiontitle = section.sectiontitle;
        if(!sectiontitle) sectiontitle = sectiondat.sectionname;
        style.font_size = 24;
        pobj = doc.createP();
        pobj.addText(`\n${sectiontitle}`, Object.assign({}, style));

        var sectionstartage = section.sectionstartage;
        var sectionendage = section.sectionendage;
        style.font_size = 11;
        style.color = '575757';
        if(sectionstartage && !sectionendage) {
          pobj.addText(`\nStarting at ${sectionstartage} years old`, Object.assign({}, style));
        } else if(!sectionstartage && sectionendage) {
          pobj.addText(`\nEnding at ${sectionendage} years old`, Object.assign({}, style));
        } else if(sectionstartage && sectionendage) {
          pobj.addText(`\nFrom ${sectionstartage} to ${sectionendage} years old`, Object.assign({}, style));
        }

        style.color = '000000';

        for(var questi in section.questions) {
          var question = section.questions[questi];
          var response = question.response;
          if(response) {
            var questiondat = findQuestion(allsections, section.sectionid, question.questionid);
            pobj = doc.createP();

            if(include_questions) {
              var questiontext = questiondat.question;
              style.font_size = 16;
              pobj.addText(`${questiontext}`, Object.assign({}, style));
            }

            style.font_size = 12;
            pobj.addText(`\n${response}`, Object.assign({}, style));
          }
        }

      }

      var out = fs.createWriteStream('test.docx');
      doc.generate(out);
      doc.generate(res);


    }
  });
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

exports.verifyDOCXPermission = function(req, res, next) {
  // req.userid should be set by auth code
  if(req.user.accounttype == 'premium' || req.user.accounttype == 'admin') {
    next();
  } else {
    res.status(403).send('No permission to download editable file');
    return;
  }
};

exports.replaceUserForID = function(req, res, next, id) {
  req.requestedid = id;
  if(req.userid == id) {
    next();
    return;
  }
  if(req.user.accounttype != 'admin') {
    res.status(403).send('No permission to view other users');
    return;
  }
  User.findOne({userid:id}).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
      console.log(err);
    } else {
      req.user = user;
      next();
    }
  });
};