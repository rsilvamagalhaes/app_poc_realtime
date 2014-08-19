
//VERIFICAR POSSIBILDIADE DE COLOCAR VERSAO 4, TEM UM  PROBLEMA PQ A FORMA Q TRABLAHA COM SESSION NA 3 É DIFERENTE DA 4



var express = require('express'),
    load = require('express-load');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('app_poc_real_time'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.listen(3000, function () {
    console.log("Projeto no ar!");
});