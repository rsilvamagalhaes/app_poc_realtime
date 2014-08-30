var express = require('express'),
    load = require('express-load'),
    error = require('./middleware/error');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('app_poc_real_time'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router)
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.status(404);
    res.render('not-found');
});

app.use(function(req, res, next) {
    res.status(500);
    res.render('server-error', error);
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(3000, function () {
    console.log("Projeto no ar!");
});