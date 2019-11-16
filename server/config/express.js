const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    sectionRouter = require('../routes/sections.server.routes'),
    userRouter = require('../routes/users.server.routes'),
    config = require('./config'),
    passport = require('passport');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // cookie ability
    app.use(cookieParser());

    // body parsing middleware
    app.use(bodyParser.json());

    // session management in express
    app.use(session({secret: config.session.secret}));

    // passport initialization
    app.use(passport.initialize());
    app.use(passport.session());


    // Add auth middleware
    app.use('/api', function(req, res, next) {// Dummy function

      if(req.headers.Authorization) {
        console.log('Auth found.');
        console.log(req.header('Authorization'));
      } else {
        console.log('Auth not found');
      }

      // req.userid should be set by this function
      req.userid = "aec2ac9a-0754-4218-bbe4-3071779efc24";
      next();
    });

    // add a router
    app.use('/api/sections', sectionRouter);
    app.use('/api/users', userRouter)

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

