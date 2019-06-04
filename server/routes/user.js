const express =  require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const passportConf = require('../passport')

const UserController = require('../controllers/admin')

router.route("/signup").post(UserController.signUp)

router.route("/signin").post(passport.authenticate('local', {session:false}), UserController.signIn)

router.route("/logout").get(passport.authenticate('jwt', { session: false }), UserController.logOut)

module.exports = router