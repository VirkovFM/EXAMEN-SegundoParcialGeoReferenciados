const express = require('express');
const path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'javascript')));
app.use(express.static(path.join(__dirname, 'styles')));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/views/map03.html'))
});

app.get('/ruta', function(request, response) {
    response.sendFile(path.join(__dirname + '/views/mejorRuta.html'));
});

app.listen(3000);