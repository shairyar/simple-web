const { app, appsignal } = require("./express");
// const https = require('https')
const { expressErrorHandler } = require("@appsignal/express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login",(req, res) => {
  console.log(req.body);
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("Logged in");
  });

  app.get("/error", (req, res) => {
  const tracer = appsignal.tracer();
  try {
    throw new Error("Oh no!");
  } catch (e) {
    tracer.setError(e);
  }
  res.send("Hello");
});

app.get("/demo", (req, res) => {

  // appsignal custom instrumentation
  const tracer = appsignal.tracer();
  const rootSpan = tracer.rootSpan();
  const childSpan = rootSpan.child();
  const user_name = 'Shairyar';
  childSpan.setName(`Query.sql.model.action`);
  childSpan.setCategory("get.query2");
  childSpan.setSQL("select * from users where name = ?", user_name);
  childSpan.close();
  res.send("Demo");
});

// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, AND AFTER ANY ROUTES!
app.use(expressErrorHandler(appsignal));

app.listen(process.env.PORT || 8080, () => {
  console.log("Listening on port 8080");
});

app.use(function (req, res, next) {
  res.status(404).send("404");
});
