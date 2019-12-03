var auth = require('../controllers/auth.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/Signup')
    .post(auth.register);

router.route('/Login') 
    .post(auth.login);

module.exports = router;