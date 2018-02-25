var mongoose = require('mongoose')
var Schema = mongoose.Schema

var homeSchema = new Schema({
  name: { type: String, unique: true },
  password: { type: String, required: true },
  members: { type: [], required: true }
})

var Home = mongoose.model("Home", homeSchema)
module.exports = Home
