//Routes For admin
const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  res.send('dashboard for admin')
});

router.get('/users', function(req, res){
  res.send('listing all users here for admin')
});

router.get('/settings', function(req, res){
  res.send('listing system settings')
});

module.exports = router;