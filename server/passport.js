const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const {JWT_SECRET} = require('./helpers/config')


const cookieExtractor = req => {
    let token = null

    if (req && req.cookies){
        token = req.cookies['user_token']
        console.log('Here is the token', token)
    }

    return token
}

//json webtoken strategy - 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET
    }, async(payload, done) =>{
        try{
            //find the admin specified in the token
            const user = await User.findById(payload.sub)

            //if the admin doesn't exist, return empty object and false 
            if(!user){
                return done(null, false)
            }

            //otherwise, return the admin
            done(null, user)

        }catch(error){
            done(error, false)
        }
    }
))

//local strategy - compare submitted password with stored password and to log in the admin
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      // Find the user given the email
      
      const user = await User.findOne({email })
      
      // If not, handle it
      if (!user) {
        return done(null, false)
      }
    
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password)
    
      // If not, handle it
      if (!isMatch) {
          console.log("We are getting in this if statement....")
        return done(null, false)
      }
    
      // Otherwise, return the user
      done(null, user)
    } catch(error) {
      done(error, false)
    }
  }))