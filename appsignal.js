const { Appsignal } = require("@appsignal/nodejs")

exports.appsignal = new Appsignal({
  active: true,
  name: "Simple web",
  pushApiKey: "PUSH-API-KEY",
  environment: "development",
  revision: "xyz1234",
  logLevel: "trace",
  logPath: "logs"
})
