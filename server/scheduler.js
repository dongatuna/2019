const CronJob = require('cron').CronJob
const notificationsWorker = require('./helpers/notificationsWorkerFactory')

const schedulerFactory = function(){
    return{
        start: function(){
            new CronJob('00 * * * *', function(){ //00 45 07 * * * - the pattern to send at 7:45 a.m
                console.log('How often are we running?')
                notificationsWorker.run()
            }, null, true, 'America/Los_Angeles')
        }
    }
}

module.exports = schedulerFactory()