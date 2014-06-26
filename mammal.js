var mongoose = require('mongoose');

var MammalSchema = new mongoose.Schema({
	name: String,
	type: String,
	year_extinct: Number
});

var Mammal = mongoose.model('Mammal', MammalSchema);

module.exports = Mammal;