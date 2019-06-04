const Course = require('../models/course')

const notificationsWorkerFactory = function(){
    return {
        run: function () {
            Course.selectCourses()
        }
    }
}

module.exports = notificationsWorkerFactory()