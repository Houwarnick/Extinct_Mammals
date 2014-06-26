var Mammal = require("./mammal.js");

var get = function(req, res){
	var type = req.param('type');
	var find_criteria = {};
	if(type) {
	  find_criteria.type = type;
	}
	Mammal.find(find_criteria, function (err, mammals) {
  	  if (err) return console.error(err);
  	  res.send(mammals)
	});
};


var post = function(req, res){
	var newMammal = new Mammal(req.body);
	newMammal.save()
    res.send(newMammal);
};

module.exports.get = get;
module.exports.post = post;