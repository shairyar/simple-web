const { Appsignal } = require("@appsignal/nodejs")

exports.appsignal = new Appsignal({
  active: false,
  name: "Simple web",
  apiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  ignoreActions: ["contact", "login", "ignored"]
})

