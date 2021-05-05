const { Appsignal } = require("@appsignal/nodejs")
exports.appsignal = new Appsignal({
  active: true,
  name: "Simple web",
  apiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  ignoreActions: ["ignored", "ignore"],
  ignoreErrors: ["FancyError", "AnotherFancyError"],
  environment: "development",
  revision: "xyz",
  debug: true,
  logPath: "logs"
})