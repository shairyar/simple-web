const user = require('express').Router();

//Routes For users
user.get('/', function(req, res){
  res.send('dashboard for user')
});

user.get('/profile', function(req, res){
  res.send('profile page of a user')
});

user.get('/settings', function(req, res){
  res.send('settings page for a user')
});

user.get('/settings2', function(req, res){
  res.send('settings2 page for a user')
});
module.exports = user;