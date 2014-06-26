
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

var api = require('./api.js');

mongoose.connect('mongodb://localhost/test', function(err){
	if(err) return console.error(err);
	console.log('connected');
});

app.get('/mammals/:type?', api.get);
app.post('/mammals', api.post);

var server = app.listen(8989, function(){
	console.log("Listening on port %d", server.address().port);
})