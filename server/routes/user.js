const express =  require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const passportConf = require('../passport')

const UserController = require('../controllers/users')

router.route("/signup").post(UserController.signUp)

router.route("/signin").post(passport.authenticate('local', {session:false}), UserController.signIn)

router.route("/status").get(passport.authenticate('jwt', { session: false }), UserController.checkAuth)

router.route("/signout").get(passport.authenticate('jwt', { session: false }), UserController.signOut)

module.exports = router