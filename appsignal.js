const { Appsignal } = require("@appsignal/nodejs")

exports.appsignal = new Appsignal({
  active: true,
  name: "Simple web",
  apiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  ignoreActions: ["contact", "login", "ignored"]
})

