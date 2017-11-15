const router = require('express').Router()
const app = require('express')
const passport = require('passport')
const UsersController = require('../controllers/user.controller')
const passportConf = require('../passport')
const passportProtectedRoute = passport.authenticate('jwt', { session: false })
const knex = require('../config/database')


const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/PostController')

router.route('/').get(getAllPosts)

// router.route('/')
//   .get(function(req,res){
//     knex.select().table('posts')
//   .then(function(collection){
//     res.json({
//       error:false,
//       data: collection
//     })
//   })
//   .catch(function(err){
//     res.status(500).json({
//       error:true,
//       data:{
//         message:err.message
//       }
//     })
//   })
// })

router.route('/secret').get(passportProtectedRoute, UsersController.secret)

router.route('/agerallt').post(createPost)

router
  .route('/:id')
  .put(updatePost)
  .get(getPostById)
  .delete(deletePost) //authenticate here later

module.exports = router
