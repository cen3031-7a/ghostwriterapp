const path = require('path'),
    mongooseSetup = require("./database"),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    session = require('express-session'),
    MongoStore = require("connect-mongo")(session),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    sectionRouter = require('../routes/sections.server.routes'),
    userRouter = require('../routes/users.server.routes');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    /* const connection = mongoose.connect(process.env.DB_URI || require('./config.js').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false); */

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // set up passport for authentication
    app.use(passport.initialize());
    app.use(passport.session());

    // to handle the session
    app.use(
      session({
        name: "sid",
        resave: false,
        saveUninitialized: false,
        secret: "secret",
        store: new MongoStore({ mongooseConnection: mongooseSetup.connection}),
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 1 // 1 day
        }
      })
    );

    // enabling the session with express-session 
    app.use((req, res, next) => {
      if (req.session) {
        res.locals.session = req.session;
      }
      next();
    });

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

