const { app, appsignal } = require("./express");
// const https = require('https')
const { expressErrorHandler } = require("@appsignal/express");

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
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
