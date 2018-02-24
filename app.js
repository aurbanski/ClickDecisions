var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

var connection = "mongodb://" + config.username + ":" + config.password + "@ds147518.mlab.com:47518/clickdecisions"
mongoose.connect(connection)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("DB connected")
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res){
  res.render('index')
});

app.post('/user', function(req, res){
  console.log(req.body)
})

app.listen(3000);
