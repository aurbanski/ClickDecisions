var mongoose = require('mongoose')
var Schema = mongoose.Schema

var homeSchema = new Schema({
  name: String,
  password: { type: String, required: true }
})

var Home = mongoose.model("Home", homeSchema)
module.exports = Home
