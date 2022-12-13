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
  if (!req.body.name) {
    res.status(400).json({
      status: 'error',
      error: 'req body cannot be empty',
    });
  }

  res.status(200).json({
    status: 'succes',
    data: req.body,
  })
});

app.post("/login",(req, res) => {
  const tracer = appsignal.tracer();
  const span = tracer.currentSpan();
  console.log("path", req.url);
  // Use AppSignal tags to add more context to the sample: https://docs.appsignal.com/guides/custom-data/tagging-request.html#node-js
  span.set("path", req.url);

  // Use AppSignal sample data to add metadata to the sample: https://docs.appsignal.com/guides/custom-data/sample-data.html
  span.setSampleData("custom_data", req.body);
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
