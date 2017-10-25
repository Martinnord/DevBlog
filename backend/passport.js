const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')
const constants = require('./config/constants')
const User = require('./models/user.model')

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: `${constants.JWT_SECRET}`
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub)

        // Handle if user don't exist
        if (!user) {
          return done(null, false)
        }

        // Otherwise, return user
        done(null, user)
      } catch (err) {
        done(err, false)
      }
    }
  )
)

// Goolge OAuth Strategy
passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: constants.clientID,
      clientSecret: constants.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        console.log('profile', profile)

        // Check if current user exists in db
        const existingUser = await User.findOne({ 'google.id': profile.id })
        if (existingUser) {
          console.log('User already exists')
          return done(null, existingUser)
        }
        console.log('User does not already exists')

        // Create new document if new account

        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        })

        console.log('newUser', newUser)

        await newUser.save()
        done(null, newUser)
      } catch (err) {
        console.log('OJSAN')
        done(err, false, err.message)
      }
    }
  )
)

// Facebook Strategy
// passport.use(
// 	'facebookToken',
// 	new FacebookStrategy(async, (username, password, done) => {
// 		clientID: constants.facebook.clientID,
// 		clientSecret: constants.facebook.clientSecret
// 	}, async (accessToken, refreshToken, profile, done) => {
// 		try {
// 			console.log('profile', profile)
// 			console.log('accessToken', accessToken)
// 			console.log('refreshToken', refreshToken)
// 		} catch (err) {
// 			done(err, false, err.message)
// 		}
// 	})
// )

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user by username
      const user = await User.findOne({ 'local.username': username })

      // No user found
      if (!user) {
        return done(null, false)
      }
      console.log('user', user) // Getting output

      // Check if password correct
      const isMatch = await user.isValidPassword(password)

      // Handle if password is not correct
      if (!isMatch) {
        return done(null, false)
      }

      // Return user
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
)
