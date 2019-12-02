/* This file is your server router. 
   Trace the dependencies so you understand which files are connected and how data is passed between them
   For each route, make note of the sequence of requests called for each

*/

/* Dependencies */
var mongodatas = require('../controllers/data.server.controller.js'),
    users = require('../controllers/users.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.use('/', users.userFromId);

router.route('/:dataType')
  .get(mongodatas.read)
  .post(mongodatas.update);

router.param('dataType', mongodatas.mongodataByType);

module.exports = router;