const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    sectionRouter = require('../routes/sections.server.routes'),
    authRouter = require('../routes/auth.server.routes')
    userRouter = require('../routes/users.server.routes');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('../config/config').db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // Add auth middleware
    app.use('/api', function(req, res, next) {// Dummy function

      if(req.headers.Authorization) {
        console.log('Auth found.');
        console.log(req.header('Authorization'));
      } else {
        console.log('Auth not found');
      }

      // req.userid should be set by this function
      // Debugging thing. We will now accept your userid as a query parameter
      // Free:    edc620fe-1003-4da6-846f-a4abee80fbd8
      // Premium: aec2ac9a-0754-4218-bbe4-3071779efc24
      // Admin:   4c57b17d-a91f-4b75-a10b-17460bfa1a10
      if(req.query.AuthID) {
        req.userid = req.query.AuthID;
      } else {
        req.userid = "aec2ac9a-0754-4218-bbe4-3071779efc24";
      }
      next();
    });

    // login and signup routes
    app.use('/Login', authRouter);
    app.use('/Signup', authRouter);

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

