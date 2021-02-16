//Routes For admin
const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  res.send('dashboard for user')
});

router.get('/profile', function(req, res){
  res.send('profile page of a user')
});

router.get('/settings', function(req, res){
  res.send('settings page for a user')
});

module.exports = router;