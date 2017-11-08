const User = require('../models/user.model')
const Joi = require('joi')
const router = require('express').Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const constants = require('../config/constants')

const userValidate = {
  signup: {
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  }
}

signToken = user => {
  return jwt.sign(
    {
      iss: 'node-blog',
      sub: user.id,
      iat: new Date().getTime()
    },
    `${constants.JWT_SECRET}`
  )
}

const signup = async (req, res, next) => {
  try {
    // Creates a new user
    const { username, name, password, email } = req.body
    console.log('email', email)

    const foundUser = await User.findOne({ 'local.email': email })
    if (foundUser) {
      console.log(foundUser)
      return res.status(403).json({ error: 'email already in use' })
    }

    const newUser = new User({
      method: 'local',
      local: {
        email,
        username,
        name,
        password
      }
    })

    await newUser.save()

    // Generate the token
    const token = signToken(newUser)

    // Respond with a token
    res.status(200).json({ token })
  } catch (err) {
    console.log('ERROR', err)
    res.status(500).json(err)
  }
}

const login = async (req, res, next) => {
  // Generate token
  const token = signToken(req.user)
  // res.status(200).json({ token })
  res.status(200).json(req.user.toAuthJSON())


  console.log('successful login')
}

const googleOAuth = async (req, res, next) => {
  // Generate token
  console.log('called')
  const token = signToken(req.user)
  res.status(200).json({ token })
}

const facebookOAuth = async (req, res, next) => {
  console.log('facebook OAuth!!')
}

const secret = async (req, res, next) => {
  console.log('I am inside of secret')
  res.json({ secret: 'resorce' })
}

module.exports = { signup, login, userValidate, googleOAuth, secret }
