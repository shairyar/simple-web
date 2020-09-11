const { appsignal } = require("./appsignal")
const { expressMiddleware, expressErrorHandler } = require("@appsignal/express")

const express = require("express");
const app = express();

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, BUT BEFORE ANY ROUTES!
app.use(expressMiddleware(appsignal));


app.get("/", (req, res) => {
  // throw new Error('Whoops! error on home page')
  res.send("How are you doing?");
});

app.get("/demo", (req, res) => {
  res.send("Demo");  
});

app.get("/contact", (req, res) => {
  throw new Error('This error should be igored')
  res.send("This is a contact page");  
});

app.get("/login", (req, res) => {
  // throw new Error('Whoops! error on contact page')
  res.send("This is a login page");  
});

app.get("/logout", (req, res) => {
  // throw new Error('Whoops! error on contact page')
  res.send("This is a logout page");  
});

app.get("/ignored", (req, res) => {
  // throw new Error('Whoops! error on contact page')
  res.send("This page should be ignored");  
});

app.get("/faq", (req, res) => {
  // throw new Error('Whoops! error on contact page')
  res.send("FAQs");  
});

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, AND AFTER ANY ROUTES!
app.use(expressErrorHandler(appsignal))

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
