var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var hbs = require('express-handlebars');
var logger = require('morgan');
//dato flash agragado viernes 21 
const session = require('express-session');
const flash = require('connect-flash');
//////////////////
//configuracion de pasport
var passport = require('passport');
//////////////////
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();


// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/fragmentos/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Express Session Middleware siempre despues de cargar las ventanas
app.use(session({
    secret: 'secret', //encripta variables de session
    resave: false, //no se guarda de nuevo la session
    saveUninitialized: true //inicialisa la variables al inicio de lebantar la aplicacion
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//agregando libreria de connect-flash despues del cookieParse y del session
app.use(flash());

//pasport mildware
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport);


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;