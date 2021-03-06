var http = require('http');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect('mongodb://localhost/test', function(err){
	if(err) return console.error(err);
	console.log('connected');
});

var MammalSchema = new mongoose.Schema({
	name: String,
	type: String,
	year_extinct: Number
});

var Mammal = mongoose.model('Mammal', MammalSchema);

app.get('/', function(req, res){
	Mammal.find({},function (err, mammals) {
  	  if (err) return console.error(err);
  	  res.send(mammals)
	  })
})

app.post('/', function(req, res){
	var newMammal = new Mammal(req.body);
	newMammal.save()
    res.send("Worked");
})

var server = app.listen(8989, function(){
	console.log("Listening on port %d", server.address().port);
})