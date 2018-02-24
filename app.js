var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path');

var User = require('./models/User')

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
app.use(express.static(path.join(__dirname, 'Public')))

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

  newUser.save(function(err){
    if (err) throw err;
    console.log('User created!');
  })
})

app.listen(3000);
