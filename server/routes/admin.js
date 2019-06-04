const express =  require('express')
const router = require('express-promise-router')()
const passport = require('passport')
const passportConf = require('../passport')

const AdminController = require('../controllers/admin')

router.route("/signup").post(AdminController.signUp)

router.route("/signin").post(passport.authenticate('local', {session:false}), AdminController.signIn)

router.route('/status').get(passport.authenticate('jwt', { session: false }), AdminController.checkAuth)

router.route("/logout").get(passport.authenticate('jwt', { session: false }), AdminController.logOut)

module.exports = router