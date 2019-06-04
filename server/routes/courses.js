const express = require('express')
const router = require('express-promise-router')()
const CourseController = require('../controllers/courses')
const passport = require('passport')
const passportConf = require('../passport')

const passportJWT = passport.authenticate('jwt', {session: false})

router.route('/').get(passportJWT, CourseController.getAllCourses)
router.route('/:course_id').get(CourseController.getCourse)
router.route('/:course_id').post(CourseController.selfCourseSignUp)

/****/
router.route('/').post(passportJWT, CourseController.addCourse)

router.route('/update/:course_id').patch(passportJWT, CourseController.updateCourse)

router.route('/admin/:course_id').post(passportJWT, CourseController.adminCourseSignUp)

router.route('/:course_id').delete(passportJWT, CourseController.deleteCourse)

module.exports = router