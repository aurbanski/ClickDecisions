var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
var User = require('./models/User')
var Home = require('./models/Home')

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
  var newUser = User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  })

  var newHome = Home({
    name: req.body.home_name,
    password: req.body.home_password
  })

  newUser.save(function(err){
    if (err) throw err;
    console.log('User created!');
  })

  newHome.save(function(err){
    if (err) throw err;
    console.log('Home created!');
  })
})

app.listen(3000);
