require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const flash = require('express-flash')
const { connect } = require('http2')
const { connection } = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')

//Database
require("./configs/db")();

//Session config
app.use(session({
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: false,
        store: MongoDbStore.create({
            mongoUrl: process.env.DB
        }),
        resave: false,
        //cookie: { maxAge: 1000 * 15 }
        cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
    }))
    //Passport config
const passportInit = require('./configs/passport.js')
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())



//Asset
app.use(express.static('public'))
    //Data parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
    //app.use(express.urlencoded())


//Global middleware
app.use((req, res, next) => {
        res.locals.session = req.session
        res.locals.user = req.user
        next()
    })
    //set Template engineS
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})