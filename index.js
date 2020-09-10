const { appsignal } = require("./appsignal")

const express = require("express");
const { expressMiddleware, expressErrorHandler } = require("@appsignal/express")
const app = express();
app.use(expressMiddleware(appsignal));


app.get("/", (req, res) => {
  throw new Error('Whoops! 3')
  // res.send("How are you doing?");
});

app.get("/demo", (req, res) => {
  res.send("Demo");  
});

app.use(expressErrorHandler(appsignal))

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
