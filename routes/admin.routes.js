//Routes For admin
const express = require('express')
const router = express.Router()

router.get('/', function(req, res){
  res.send('dashboard for admin')
});

router.get('/users', function(req, res){
  res.send('listing all users here for admin')
});

router.get('settings', function(req, res){
  res.send('listing system settings')
});

module.exports = router;

// app.get("/", (req, res) => {
//   // throw new Error('Whoops! error on home page')
//   res.send("How are you doing?");
// });

// app.get("/demo", (req, res) => {
//   res.send("Demo");  
// });

// app.get("/contact", (req, res) => {
//   throw new Error('This error should be igored')
//   res.send("This is a contact page");  
// });

// app.get("/login", (req, res) => {
//   // throw new Error('Whoops! error on contact page')
//   res.send("This is a login page");  
// });

// app.get("/logout", (req, res) => {
//   // throw new Error('Whoops! error on contact page')
//   res.send("This is a logout page");  
// });

// app.get("/ignored", (req, res) => {
//   // throw new Error('Whoops! error on contact page')
//   res.send("This page should be ignored");  
// });

// app.get("/faq", (req, res) => {
//   // throw new Error('Whoops! error on contact page')
//   res.send("FAQs");  
// });