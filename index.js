const { appsignal } = require("./appsignal")
const { expressMiddleware, expressErrorHandler } = require("@appsignal/express")

const express = require("express")
const app = express();
const adminRoutes = require("./routes/admin.routes");

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, BUT BEFORE ANY ROUTES!
app.use(expressMiddleware(appsignal));
app.use('/admin', adminRoutes);

app.get("/", (req, res) => {
  // throw new Error('Whoops! error on home page')
  res.send("How are you doing?");
});

app.get("/demo", (req, res) => {
  res.send("Demo");  
});

app.get("/error", (req, res) => {
  throw new Error('This error should be igored')
});


app.get("/ignored", (req, res) => {
  // throw new Error('Whoops! error on contact page')
  res.send("This page should be ignored");  
});

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, AND AFTER ANY ROUTES!
app.use(expressErrorHandler(appsignal))

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
