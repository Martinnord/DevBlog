const router = require('express').Router()
const validate = require('express-validation')
const passport = require('passport')
const passportConf = require('../passport')

const passportLogin = passport.authenticate('local', { session: false })
// const passportGoogle = passport.authenticate('googleToken', { session: false })
// const passportFacebook = passport.authenticate('facebookToken', {
//   session: false
// })

const {
  signup,
  login,
  users,
  userValidate,
  googleOAuth,
  facebookOAuth
} = require('../controllers/user.controller')

router.route('/signup', validate(userValidate.signup)).post(signup)

router.route('/login').post(passportLogin, login)

// router.route('/oauth/google').post(passportGoogle, googleOAuth)
//
// router.route('/oauth/facebook').post(passportFacebook, facebookOAuth)

module.exports = router
