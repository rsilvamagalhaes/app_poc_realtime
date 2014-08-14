// importa os frameworks que serão utilizados
var express = require('express');
var routes = require('./routes');
var load = require("express-load");
var app = express();

// seta configurações
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// seta configurações de rotas
app.get('/', routes.index);
app.get('/usuarios', routes.user.index);

// carrega os modulos que serão usados
load.('models')
    .then('controllers')
    .then('routes')
    .into(app);
    
// Coloca aplicação no ar
app.listen(3000, function() {
    console.log("Aplicação no ar!");
});