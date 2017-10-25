const router = require('express').Router()
const _ = require('lodash')
const authService = require('../services/auth')

const authenticate = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const { user, token } = await authService.authenticate(accessToken)
    req.user = user
    req.token = token
    next()
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized', error: err.message })
  }
}

module.exports = authenticate
