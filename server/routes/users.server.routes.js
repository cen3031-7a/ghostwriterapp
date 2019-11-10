/* This file is your server router. 
   Trace the dependencies so you understand which files are connected and how data is passed between them
   For each route, make note of the sequence of requests called for each

*/

/* Dependencies */
var users = require('../controllers/users.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    passport = require('passport'), // reffers to the passport authentication library
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.use('/', users.userFromId);

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 
  Note: the listings variable above and the file it is connected to help you trace
 */
router.route('/info')
  .get(users.info);

router.route('/timeline')
  .get(users.gettimeline)
  .post(users.updatetimeline);

router.route('/question/response')
  .post(users.response);

router.route('/verify')
  .get(users.verify)

router.get('/login/local')
  .get(users.local_login)

router.route('/login/facebook')
  .get(users.facebook_login)

router.route('/login/facebook/callback')
  .get(users.facebook_callback)

router.route('/login/google')
  .get(users.google_login)

router.route('/login/google/callback')
  .get(users.google_callback)

router.route('/logout')
  .post(users.logout)

router.route('/register')
  .post(users.register)

module.exports = router;