# GhostWriterApp
## Live
You can find a demo of GhostWriter online at [http://ghostwriter-7a.herokuapp.com/](http://ghostwriter-7a.herokuapp.com/)

## Libraries and Tools Used
* Node.js
* React
* Bootstrap
* MongoDB
* Mongoose
* Express
* [officegen](https://github.com/Ziv-Barber/officegen)
* [PDFKit](https://github.com/foliojs/pdfkit)
* [react-dragula](https://github.com/bevacqua/react-dragula)
* [react-feather](https://github.com/feathericons/react-feather)
* [react-quill](https://github.com/zenoamaro/react-quill)
* [react-paypal-button-v2](https://github.com/Luehang/react-paypal-button-v2)
* [passport](https://github.com/jaredhanson/passport)
* [passport-jwt](https://github.com/mikenicholson/passport-jwt)
* [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth)
* [passport-facebook](https://github.com/jaredhanson/passport-facebook)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [bycryptjs](https://github.com/dcodeIO/bcrypt.js)
* [is-empty](https://github.com/ianstormtaylor/is-empty)
* [validator](validatorjs/validator.js)

[Big shout out to Rishi Prasad and his tutorial](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669)

## Features
Homepage:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/homepage.png)
Sign Up:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/signup.png)
Login:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/login.png)
My Account:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/myaccount.png)
Timeline Page:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/questions.png)
Question Editor:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/questioneditor.png)
More Questions:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/questions2.png)
Writing Tip:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/writingtip.png)
Download PDF:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/downloadpdf.png)
Download DOCX:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/downloaddocx.png)
Admin Page:
![](https://github.com/cen3031-7a/ghostwriterapp/raw/master/img/adminpage.png)

## Run the App
### Locally
1. Download or clone the repository.
2. In the root directory of the project, run `npm install`
3. After that finishes, run `npm install all`
4. Connect the database
5. Run `npm run-script dev` to launch the server

### Heroku
1. In your GitHub account, fork the repository.
2. Create a new app in Heroku
3. Select Deploy->GitHub
4. Select your account and find the cloned repository
5. Click Search, then connect
6. Connect the database with the Environment Variable method
7. Return to the Deploy tab and select Deploy Branch
8. Click Open App to see the deployed website


## Connect the Database
In order to connect the database to the backend, you need to provide a Mongo connection URI. You can get your Mongo connection string from the database software you are using. If using Atlas, for example, you can click on Clusters->Connect->Application->Node.js to get a connection string that will look like `mongodb+srv://<username>:<password>@cluster0-xxxxx.mongodb.net/example?retryWrites=true&w=majority`. Replace `<username>` and `<password>` with your Mongo database user's credentials. Once you have your string, depending on your deployment, you can use one of the following options to connect your database.

## Passport requirements and other keys
In addition, to be able to use the passports methods for authentication (gogole jwt facebook), and sessions such as express sessions, you need to go the developer portals for facebook and google to generate your credentials for your application to then be able to use those methods of authentication. for the sessions and jwt, just create a secret of your own and make sure you have it in the proper section of the `config.js` as shown in the next section.

### Local File
Create a file in `/ghostwriterapp/server/config/` called `config.js`. Put the following in the file:
```
module.exports = {
    db: {
        uri: 'mongodb+srv://<username>:<password>@cluster0-xxxxx.mongodb.net/example?retryWrites=true&w=majority'
    },
    facebook: {
        appid: YOUR_APPID_HERE,
        clientsecret: YOUR_CLIENTSECRET_HERE
    },
    google: {
        clientid: YOUR_CLIENTID_HERE,
        clientsecret: YOUR_CLIENTSECRET_HERE
    },
    secrets: {
        session: YOUR_SECRET_HERE,
        jwt_secret: YOUR_SECRET_HERE
    }
};
```
Save the file and launch the server.

### Environment Variable
If an environment variable is found, it will be used before a local file. If you know how to use environment variables, you can use one for a local installation. The process varies depending on your setup. If you are using Heroku for deployment, you can set one as described below.
1. Configure your app at https://dashboard.heroku.com/apps/xxxxx
2. Select Settings->Revel Config Vars
3. For `Key` type `DB_URI`
4. For `Value` type your connection string
5. Save and launch

The connection string will be loaded when the application starts.
