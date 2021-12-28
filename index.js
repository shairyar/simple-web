const { app, appsignal } = require("./express");
// const https = require('https')
const { expressErrorHandler } = require("@appsignal/express");

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  // console.log(process.env);
  res.send("How are you doing?");
});

app.get("/demo", (req, res) => {
  // Span for the query
  const tracer = appsignal.tracer();
  const rootSpan = tracer.rootSpan();
  const childSpan = rootSpan.child();
  childSpan.setName(`Query.sql.model.action`);
  childSpan.setCategory("get.query");
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
