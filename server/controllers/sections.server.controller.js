
/* Dependencies */
var mongoose = require('mongoose'), 
    Section = require('../models/section.server.model.js');
    
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  or
  https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
 */


exports.organize = function(req, res) {
  console.log('got organize request');
  console.log(req.body);

  if(req.user.accounttype != 'admin') {
    res.status(403).send('Not an admin');
    return;
  }

  var error = false;
  var done = 0;
  var allset = false;

  for(var secti in req.body.sections) {
    var sectid = req.body.sections[secti];
    done++;
    Section.findOneAndUpdate({sectionid:sectid}, {pos:secti}, {}, (err, doc, raw) => {
      if(err) {
        console.log(err);
        error = true;
      }
      done--;
      if(allset && done == 0) {
        res.status(200).end();
        console.log('order updated');
      }
    });
  }
  allset = true;
  console.log('done queuing updates');
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.section);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var section = req.section;
  var waspresent = false;

  console.log('got update request');
  console.log(req.body);

  if(req.user.accounttype != 'admin') {
    res.status(403).send('Not an admin');
    return;
  }

  if(section) { // Section was present
    console.log('section was present');
    waspresent = true;
    if(req.body.sectionname) section.sectionname = req.body.sectionname;
    if(req.body.questions) {
      console.log('updating questions');
      for(var qupdate in req.body.questions) {
        var updatedq = false;
        for(var question in section.questions) {
          if(section.questions[question].questionid == req.body.questions[qupdate].questionid) { // Found the question, update it
            console.log('found question to update');
            updatedq = true;
            section.questions[question].question = req.body.questions[qupdate].question;
            section.questions[question].tips = req.body.questions[qupdate].tips;
          }
        }
        if(!updatedq) { // Was not present to update, go ahead and add it
          console.log('inserting question');
          section.questions.push(req.body.questions[qupdate]);
        }
      }
    }
    if(req.body.removequestions) {
      /*section.questions = section.questions.filter(function (quest, index, array) {
        return !req.body.removequestions.includes(quest.questionid);
      });*/
      for(var question in section.questions) {
        if(req.body.removequestions.includes(section.questions[question].questionid)) {
          section.questions[question].isDeleted = true;
        }
      }
      console.log('removed questions');
    }
  } else { // Section doesn't exist yet
    req.body.removequestions = undefined;
    console.log('inserting section');
    section = new Section(req.body);
    section.sectionid = req.params.sectionId;
  }

  console.log(section);
 
  /* Save the listing */
  section.save(err => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      if(waspresent) {
        res.status(200).end();
      } else {
        res.status(201).end();
      }
    }
  })

};

exports.updateQ = function(req, res) { // TODO THis functionality
  var section = req.section;
  var waspresent = false;

  console.log('got update questions request');
  console.log(req.body);

  if(req.user.accounttype != 'admin') {
    res.status(403).send('Not an admin');
    return;
  }

  if(section) { // Section was present
    console.log('section was present');
    waspresent = true;
    if(req.body.sectionname) section.sectionname = req.body.sectionname;
    if(req.body.questions) {
      console.log('updating questions');
      var newquestions = [];
      for(var qupdate in req.body.questions) {
        var reqquest = req.body.questions[qupdate];
        if(!reqquest.questionid) {
          console.log('questionid not found for a question. Ignoring.');
          continue;
        }
        var newquest = null;
        var originalquestion = null;
        for(var question in section.questions) {
          if(section.questions[question].questionid == reqquest.questionid) { // Found the question, update it
            console.log('found question to update');
            originalquestion = section.questions[question];
          }
        }
        if(originalquestion == null) { // Was not present to update, go ahead and add it
          console.log('inserting question');
          if(!reqquest.question) {
            console.log('Could not find question text for new question. Ignoring.');
            continue;
          }
          newquest = reqquest;
        } else {
          newquest = originalquestion;
          if(reqquest.question) {
            console.log('updated question text');
            newquest.question = reqquest.question;
          }
          if(reqquest.tips) {
            console.log('updated question tips');
            newquest.tips = reqquest.tips;
          }
        }
        newquestions.push(newquest);
      }
      for(var oquesti in section.questions) {
        var oquestinnquest = false;
        for(var nquesti in newquestions) {
          if(section.questions[oquesti].questionid == newquestions[nquesti].questionid) {
            oquestinnquest = true;
            break;
          }
        }
        if(!oquestinnquest) {
          var onquest = section.questions[oquesti];
          onquest.isDeleted = true;
          newquestions.push(onquest);
        }
      }
      section.questions = newquestions;
    }
  } else { // Section doesn't exist yet
    console.log('inserting section');
    section = new Section(req.body);
    section.sectionid = req.params.sectionId;
  }

  console.log(section);
 
  /* Save the listing */
  section.save(err => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      if(waspresent) {
        res.status(200).end();
      } else {
        res.status(201).end();
      }
    }
  })

};

/* Delete a listing */
exports.delete = function(req, res) {
  var section = req.section;
  var isPresent = false;
  if(section) isPresent = true;

  if(req.user.accounttype != 'admin') {
    res.status(403).send('Not an admin');
    return;
  }

  /* Add your code to remove the listins */

  if(!isPresent) {
    res.status(404).end();
    return;
  }

  section.isDeleted = true;

  section.save(err => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('deleted section: ');
      console.log(section.sectionname);
      res.status(200).end();
    }
  });

};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Add your code */
  var showDeleted = false;
  if(req.query.showDeleted == 'true') {
    showDeleted = true;
  }
  console.log('showing deleted:');
  console.log(showDeleted);

  Section.find({}).exec((err, sections) => {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      var respon = {sections : []};
      respon.sections = sections;
      if(req.query.include_questions != 'true') {
        var newrespon = {sections : []};
        for(var secti in respon.sections) {
          var sect = {
            sectionid: respon.sections[secti].sectionid,
            sectionname: respon.sections[secti].sectionname,
            pos: respon.sections[secti].pos
          };
          if(respon.sections[secti].isDeleted) {
            sect.isDeleted = true;
          }
          newrespon.sections.push(sect);
        }
        respon = newrespon;
      }
      if(!showDeleted) {
        var newrespon = {sections : []};
        for(var secti in respon.sections) {
          var sect = respon.sections[secti];
          if(!(sect.isDeleted)) {
            var newquests = [];
            for(var questi in sect.questions) {
              if(!(sect.questions[questi].isDeleted)) {
                newquests.push(sect.questions[questi]);
              } else {
                console.log('was deleted quest');
                console.log(respon.sections[secti]);
              }
            }
            sect.questions = newquests;
            newrespon.sections.push(sect);
          } else {
            console.log('was deleted sect');
            console.log(sect);
          }
        }
        console.log('old respon');
        console.log(respon);
        respon = newrespon;
        console.log('new respon');
        console.log(newrespon);
      }
      console.log('sorting');
      //console.log(respon);
      respon.sections.sort((a,b) => {
        if((a.hasOwnProperty('pos') && a.pos != undefined) && (b.hasOwnProperty('pos') && b.pos != undefined)) {
          //console.log('sorting... both had prop');
          return a.pos - b.pos;
        } else if((a.hasOwnProperty('pos') && a.pos != undefined) && !(b.hasOwnProperty('pos') && b.pos != undefined)) {
          //console.log('sorting... a had prop');
          return -1;
        } else if(!(a.hasOwnProperty('pos') && a.pos != undefined) && (b.hasOwnProperty('pos') && b.pos != undefined)) {
          //console.log('sorting... b had prop');
          return 1;
        } else {
          //console.log('sorting... none had prop');
          return 0;
        }
      });
      //console.log(respon);
      res.json(respon);
    }
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.sectionById = function(req, res, next, id) {
  req.sectionid = id;
  Section.findOne({sectionid:id}).exec(function(err, section) {
    if(err) {
      res.status(400).send(err);
      console.log(err);
    } else {
      req.section = section;
      next();
    }
  });
};