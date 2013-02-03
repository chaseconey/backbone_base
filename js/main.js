//We will just make it global here so we can easily access via Console

// var Person = function(config) {
// 	//These here are attributes, they are unique to every instance
// 	this.name = config.name;
// 	this.age = config.age;
// 	this.job = config.job
// };

// //These are functions that a Person could have, but they are not
// //unique to every Person, so we should prototype it (meaning 20 people
// //and there is still only one function in memeory)
// Person.prototype.work = function() {
// 	return this.name + " is doing work";
// };


// This object is created in the same way as before in the console
// person1 = new Person();
var Person = Backbone.Model.extend({
	//These are the attributes that come with the object
	//by default on instantiation
	defaults: {
		//You can access these objects with .get('<attribute>')
		name: '',
		age: 0,
		job: ''
	},

	//This is run every time a setter is run on this object
	validate: function(attrs) {
		if(attrs.age < 0) {
			return "You cannot be negative years old!";
		}
		if( !attrs.name ) {
			return "You must have a name!";
		}
	},

	//NOTICE you don't have any input for this function
	work: function() {
		return this.get('name') + " is doing work";
	}
});

var PeopleCollection = Backbone.Collection.extend({
	model: Person
});

//We now need a View for the collection
var PeopleView = Backbone.View.extend({
	tagName: "ul",

	initialize: function() {
		//this.render();
	},

	render: function() {
		//Here we can pass this as a second parameter to keep the proper scope
		this.collection.each(function(person){
			var personView = new PersonView({ model: person });
			this.$el.append( personView.render().el );
		}, this);

		return this;
	}
});

var PersonView = Backbone.View.extend({
	tagName: "li",
	//className: "person",
	//id: "person-id"

	//Separating it out a little now, point to the script with selector
	template: _.template( $("#personTemplate").html() ),

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});

//Sample creation of Model and View
var peopleCollection = new PeopleCollection(
	[
		{name: "Chase Coney", age: 23, job: "Software Developer"},
		{name: "Sarah Daniels", age: 22, job: "Marketing Manager"},
		{name: "Murphy Judge Joe Brown", age: 65, job: "Garbage Man"}
	]
);
var peopleView = new PeopleView({ collection: peopleCollection });

$(document.body).append(peopleView.render().el);

