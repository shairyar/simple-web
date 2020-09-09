const { Appsignal } = require("@appsignal/nodejs")
const appsignal = new Appsignal({
  active: true,
  name: "Simple web",
  apiKey: "KEY"
})


const express = require("express");

const app = express();

app.get("/", (req, res) => {
  // throw new Error('Whoops!')
  res.send("How are you doing?");
});

app.get("/demo", (req, res) => {
  res.send("Demo");
  
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
