const { Appsignal } = require("@appsignal/nodejs")

exports.appsignal = new Appsignal({
  active: true,
  name: "Simple web",
  environment: "development",
  revision: "xyz1234",
  logLevel: "trace",
  logPath: "logs"
})
