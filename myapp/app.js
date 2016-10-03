var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var projects = require('./routes/projects');
var questions = require('./routes/questions');
var room = require('./routes/room');
var answer = require('./routes/answer');
var run = require('./routes/run');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    store: new MongoStore({
    //connect-mongo settings
    db: 'session',
    host: process.env.MONGO_1_PORT_27017_TCP_ADDR,
    clear_interval: 60 * 60
      }),
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
}));

var loginCheck = function (req, res, next) {
	if(req.session.user){
	  next();
	}
	else{
	  res.redirect('/login');
	}
};


app.get('/', loginCheck, routes.index);
app.get('/login', routes.login);
app.post('/add', routes.add);
app.post('/delete', routes.delete);
app.get('/logout', routes.logout);

app.use('/', routes);
app.get('/projects',loginCheck,  projects.index);
app.post('/projects/make', projects.makeProject);

app.get('/questions',loginCheck, questions.index);
app.post('/questions/make', questions.makeQuestion);

app.get('/room',loginCheck, room.index);
app.get('/answer',loginCheck, answer.index);
app.get('/run',loginCheck, run.index);


// / catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
