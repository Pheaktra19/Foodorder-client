const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require("../app/models/user")

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
        console.log(email, password)
            //Login
            //check if email exits
        const user = await User.findOne({ email: email })

        if (!user) {
            return done(null, false, { message: 'No user with this email!' })
        }

        const auth = await bcrypt.compare(password, user.password);


        if (auth) {
            return done(null, user, { message: 'Logged in sucessfully!' })
        } else {
            return done(null, false, { message: 'Wrong username or password' })
        }
    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}

module.exports = init