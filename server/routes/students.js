const express = require('express')
const router = require('express-promise-router')()
const StudentController = require('../controllers/students')
const passport = require('passport')
const passportConf = require('../passport')

const passportJWT = passport.authenticate('jwt', {session: false})

router.route('/').patch(passportJWT, StudentController.updateStudent)

router.route('/').get(passportJWT, StudentController.getDailyRegistrations)

router.route('/search').post(passportJWT, StudentController.searchStudent)

router.route('/:student_id').get(passportJWT, StudentController.getStudent)

router.route('/transfer').patch(passportJWT, StudentController.transferStudent)

router.route('/unenroll/:course_id').patch(passportJWT, StudentController.unenrollStudent)

module.exports = router