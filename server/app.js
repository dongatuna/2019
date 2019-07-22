const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cfg= require('./config')

mongoose.Promise = global.Promise

//connect to the database
//"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"
mongoose.connect(`mongodb+srv://${cfg.DB.username}:${cfg.DB.password}@excel-fd1hn.azure.mongodb.net/test?retryWrites=true&w=majority`,
{
    useNewUrlParser: true
})

//initialize express and save it in constant called app
const app = express()

//middleware
app.use(morgan('dev')) //morgan is used to console.log -- reason we can't use in front end

app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//set up routes for students, admin and courses
app.use('/students', require('./routes/students'))
app.use('/courses', require('./routes/courses'))
app.use('/jobs', require('./routes/jobs'))
app.use('/user', require('./routes/user'))

if(process.env.NODE_ENV === 'production'){
  //where to look for static folder
  app.use(express.static(__dirname +'/publice'))
}

const scheduler = require('./scheduler')

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404
  next(error)
})
  
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

scheduler.start()
  
module.exports = app