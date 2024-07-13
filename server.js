const config = require('./config.json');
const express = require('express');
const utils = require('@un-boxing-hosting/boxing-hosting-utils');
const db = undefined //new utils.db(config.db);
const uuid = require('uuid').v4
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const bcrypt = require('bcrypt');
const os = require(`os`);
const boxname = os.hostname();
const port = 8101;
//const dirname = "dearassassin/server";
//const port = 8099;
const saltRounds = 10;
var dirname = "sites/PackLifecc/server";
//const dirname = "server";
if (boxname == "un-boxing-mans-pc") {
    console.log(`Running on ${boxname}`)
    dirname = "PackLifecc/server"
}

const logger = require('morgan');
const favicon = require('serve-favicon');
const app = express();
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.set(`trust proxy`, true);

app.use(favicon(`${dirname}/pix/favicon.ico`))
app.use(express.static(dirname + "/"))
app.use(`/events`, express.static(dirname + '/events.html'));
app.use(`/about`, express.static(dirname + '/about.html'));




// configure passport.js to use the local strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
},
(email, password, done) => {
    //JSON.stringify(req.session.passport)
    //db.get(email)

    const user = db.get(`${email}.email`)
    const dbpassword = db.get(`${email}.password`)

    console.log(user)
    console.log(dbpassword)
    if (!user) {
        return done(null, false, {
            message: 'Invalid credentials.\n'
        });
    }
    if (!bcrypt.compareSync(password, dbpassword.toString())) {
        return done(null, false, {
            message: 'Invalid credentials.\n'
        });
    }
    return done(null, user);


}
));

// tell passport how to serialize the user
passport.serializeUser(function (user, done) {
done(null, user);
});

passport.deserializeUser(function (user, done) {
done(null, user);
});

app.listen(port, () => {
    console.log(`PackLifecc Listening on port ${port}`)

})
app.set("port", port);
module.exports = {
    app
}