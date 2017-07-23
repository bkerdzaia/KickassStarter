
var express = require('express');
var app = express();
var path = require('path');

app.use('/css', express.static(__dirname + '/../css'));
app.use('/scripts', express.static(__dirname));
app.use('/images', express.static(__dirname + '/../images'));
app.use('/libs', express.static(__dirname + '/../libs'));
app.use('/menu', express.static(__dirname + '/../menu'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.listen(8080);
