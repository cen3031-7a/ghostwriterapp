
/* Dependencies */
var mongoose = require('mongoose'), 
    MongoData = require('../models/data.server.model.js');


exports.read = function(req, res) {
  res.json(req.mongodata);
};

exports.update = function(req, res) {
  var mongodata = req.mongodata;
  var waspresent = false;

  console.log('got update data request');
  console.log(req.body);

  if(!req.user || req.user.accounttype != 'admin') {
    res.status(403).send('Not an admin');
    return;
  }

  if(mongodata) { // Section was present
    console.log('data was present');
    waspresent = true;

    var mdstr = mongodata.toString();
    var regex = /(_id: )((\w|\d)+),/gm;
    var mdstr1 = mdstr.replace(regex, '_id: "$2",');
    regex = /: '(.+)',\n/gm;
    var mdstr2 = mdstr1.replace(regex, ': "$1",\n');
    regex = /: '(.+)'\n/gm;
    var mdstr3 = mdstr2.replace(regex, ': "$1"\n');
    regex = /(\n)(\s)*(['"])?([a-zA-Z0-9_]+)(['"])?:/gm;
    var mdstrfixed = mdstr3.replace(regex, '\n  "$4": ');

    console.log('fixing json');
    console.log(mdstr);
    console.log(mdstr1);
    console.log(mdstr2);
    console.log(mdstr3);
    console.log(mdstrfixed);

    var nmd = JSON.parse(mdstrfixed);
    for (var prop in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
        console.log('adding prop ' + prop);
        if(prop == 'type' || prop == '_id' || prop == 'save') {
          console.log('ignoring prop ' + prop);
          continue;
        }
        nmd[prop] = req.body[prop];
      }
    }

    console.log(nmd);

    MongoData.findOneAndUpdate({_id:nmd._id},nmd,{new:true,overwrite:true}, (err, doc, raw) => {
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
    });
    
  } else { // Section doesn't exist yet
    console.log('inserting data');
    req.body['type'] = undefined;
    req.body['_id'] = undefined;
    req.body['save'] = undefined;
    mongodata = new MongoData(req.body);
    mongodata.type = req.params.dataType;
    mongodata.save(err => {
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
    });
  }
};




exports.mongodataByType = function(req, res, next, datatype) {
  req.mongodata = datatype;
  MongoData.findOne({type:datatype}).exec(function(err, mongodata) {
    if(err) {
      res.status(400).send(err);
      console.log(err);
    } else {
      req.mongodata = mongodata;
      next();
    }
  });
};