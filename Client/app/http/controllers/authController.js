const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password } = req.body
                //Validate request
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                console.log(err, user, info)
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('auth/register')
        },


        async postRegister(req, res) {
            try {
                console.log('register', req.body)
                const { name, email, password, phone, password1 } = req.body
                    // login(name, email, password, password1)
                    //Validate request
                if (!name || !email || !password || !phone || !password1) {
                    req.flash('error', 'All fields are required!')
                    req.flash('name', name)
                    req.flash('name', email)

                    return res.redirect('/register')
                }
                if (password.length != 0) {
                    if (password != password1) {
                        req.flash('error', 'Password is not matched!')
                        req.flash('name', name)
                        req.flash('name', email)
                        req.flash('name', phone)

                        return res.redirect('/register')
                    }
                }
                //check if email exists
                User.exists({ email: email }, (err, result) => {
                    if (result) {
                        req.flash('error', "Email already taken!")
                        req.flash('name', name)
                        req.flash('email', email)
                        return res.redirect('/register')
                    }
                })

                //Hash password
                const hashPassword = await bcrypt.hash(password, 10)

                //Create a user
                const user = await User.create({
                    userName: name,
                    email: email,
                    phone: phone,
                    password: password,
                    password1: password1
                })



                user.save().then((user) => {
                    //login
                    return res.redirect('/')
                }).catch(err => {
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/register')
                })


            } catch (err) {
                console.log(err)
                req.flash('error', 'Something went wrong')
            }

        },
        logout(req, res) {

            // req.logout()
            //return res.redirect('/login')

            return res.clearCookie("connect.sid").redirect('/')
        }


    }
}

module.exports = authController