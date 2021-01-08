const express = require('express');
const app = express();

require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});


const productRoute = require('./api/routes/product.route')

const cookieParser = require('cookie-parser')
const expressHbs  = require('express-handlebars');
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)


const indexRoute = require('./routes/index.route')
const port  = 3000; // mvc

app.use(cookieParser(process.env.SESSION_SECRET))

app.engine('.hbs', expressHbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'SESSION_SECRET',
  resave : false,
  saveUninitialized : false,
  store : new MongoStore({mongooseConnection : mongoose.connection}),
  cookie : {maxAge : 180 * 60 * 1000}
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'));
// app.use('/shop', productRoute);
app.use('/', indexRoute)

app.listen(port,function(){
	console.log('server is listening on ' + port);
});		
