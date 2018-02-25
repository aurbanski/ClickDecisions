var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path');
const _ = require('lodash')
var session = require('express-session');
var cookieParser = require('cookie-parser');

var User = require('./models/User')
var Home = require('./models/Home')

var connection = "mongodb://" + config.username + ":" + config.password + "@ds147518.mlab.com:47518/clickdecisions"
mongoose.connect(connection)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("DB connected")
})

app.use(cookieParser());
app.use(session({secret: "KanyeWest"}));

app.use(bodyParser.urlencoded({extended: true}))
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'Public')))

app.get('/', function(req, res){
  res.render('index', {session: req.session.user})
});

app.get('/user', function(req, res){
  res.render('user')
})

app.post('/user', function(req, res){
  console.log(req.body)

  var newUser = User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  })

  var checkHome = Home.find({ name: req.body.home_name }, function(err, home){
    if (err) throw err;
    console.log("🐉")
    console.log(home[0])
    console.log(_.isEmpty(home[0]))
    if (_.isEmpty(home[0])){
      var newHome = Home({
        name: req.body.home_name,
        password: req.body.home_password,
        members: [req.body.username]
      })

      newHome.save(function(err){
        if (err) throw err;
        console.log('Home created1!');
      })
    } else {
      console.log("🔥")
      console.log(home)
      home[0].members.push(req.body.username)
      home[0].save(function(err){
        if (err) throw err;
        console.log('Home created!2');
      })
    }
    console.log(home[0])
  })

  // var newHome = Home({
  //   name: req.body.home_name,
  //   password: req.body.home_password
  // })

  newUser.save(function(err){
    if (err) throw err;
    // res.redirect('/user')
    console.log('User created!');
  })

  // newHome.save(function(err){
  //   if (err) throw err;
  //   console.log('Home created!');
  // })
  req.session.user = newUser;
  res.redirect('/')
})

app.listen(3000);
