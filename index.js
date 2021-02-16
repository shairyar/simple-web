const { appsignal } = require("./appsignal")
const { expressMiddleware, expressErrorHandler } = require("@appsignal/express")

const express = require("express")
const app = express();
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const https = require('https')
// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, BUT BEFORE ANY ROUTES!
app.use(expressMiddleware(appsignal));
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);


app.get("/", (req, res) => {
  // let user_id = 6;
  // let locale = 'en'
  // let default_locale = 'en'


  // const tracer = appsignal.tracer();

  // const span = tracer.currentSpan();
  // const childSpan = span.child();

  // childSpan.setName("GET /homepage");
  // span.setSampleData("params", { string: "value", number: 123 });
  // span.setSampleData("custom_data", { foo: "bar" });
  // childSpan.close()
  // throw new Error('Whoops! error on home page')
  // const tracer = appsignal.tracer();
  // const span = tracer.currentSpan();
  // span.set("user", user_id);
  // span.set("admin_url", '<a href="url">Admin</a>');
  // span.set("stripe_customer", '<a href="url">Stripe</a>');
  // span.set("locale", locale);
  // span.set("default_locale", default_locale);
  console.log(req)
  res.send("How are you doing?");
});

app.get("/demo", (req, res) => {

  const tracer = appsignal.tracer();
  const span = tracer.currentSpan("{setName: 'Get request to route todo'}");
  
  // span.setName("Get request to route todo");
  console.log('sending a request to localhost')

  const options = {
    hostname: 'google',
    port: 3000,
    path: '/todos',
    method: 'GET'
  }
  
  const request = https.request(options, response => {
    console.log(`statusCode: ${response.statusCode}`)
  
    response.on('data', d => {
      process.stdout.write(d)
    })

    response.on('error', error => {
      console.error(error)
    })
  });
  
  request.end()
  span.close()

  res.send("Demo");
});

app.get("/error", (req, res) => {
  throw new Error('No message given')
});

app.get("/error2", (req, res) => {
  throw new AnotherFancyError('No message given')
});

app.get("/ignored", (req, res) => {
  // throw new Error('Whoops! error on contact page')
  res.send("This page should be ignored");
});

app.get("/ignore", (req, res) => {
  res.send("This route should not be reported to appsignal");
});


// ADD THIS AFTER ANY OTHER EXPRESS MIDDLEWARE, AND AFTER ANY ROUTES!
app.use(expressErrorHandler(appsignal))

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

class FancyError extends Error {
  constructor(args) {
    super(args);
    this.name = "FancyError"
  }
}

class AnotherFancyError extends Error {
  constructor(args) {
    super(args);
    this.name = "AnotherFancyError"
  }
}

app.use(function (req, res, next) {
  res.status(404).send('404');
});

function sendRequest() {

}