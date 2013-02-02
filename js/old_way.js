//We will just make it global here so we can easily access via Console

var Person = function(config) {
	//These here are attributes, they are unique to every instance
	this.name = config.name;
	this.age = config.age;
	this.job = config.job
};

//These are functions that a Person could have, but they are not
//unique to every Person, so we should prototype it (meaning 20 people
//and there is still only one function in memeory)
Person.prototype.work = function() {
	return this.name + " is doing work";
};