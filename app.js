var express = require('express'),
    app = express(),
    load = require('express-load'),
    error = require('./middleware/error'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

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

app.use(function (req, res, next) {
    res.status(404);
    res.render('not-found');
});

app.use(function (req, res, next) {
    res.status(500);
    res.render('server-error', error);
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

io.sockets.on('connection', function (client){
    client.on('send-server', function (data) {
        var msg = "<b>" + data.nome + ":</b> " + data.msg + "<br>";
        client.emit('send-client', msg);
        client.broadcast.emit('send-client', msg);
    });
});

app.listen(3000, function () {
    console.log("Projeto no ar!");
});