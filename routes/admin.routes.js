//Routes For admin
const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  res.send('dashboard for admin')
});

router.get('/users', function(req, res){
  res.send('listing all users here for admin')
});

router.get('/users/:id', function(req, res){
  res.send('listing a specific user here for admin')
});

router.get('/v1/users/text-macros/:id', function(req, res){
  res.send('Test route')
});

router.get('/settings', function(req, res){
  res.send('listing system settings')
});

module.exports = router;