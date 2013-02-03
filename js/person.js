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

(function(){

//global namespacing
window.App = {
	Models: {},
	Views: {},
	Collections: {}
};

//This is a template helper that will make the template code a bit cleaner
window.template = function(id) {
	return $("#" + id).html();
};



// This object is created in the same way as before in the console
// person1 = new Person();
App.Models.Person = Backbone.Model.extend({
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

App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});

//We now need a View for the collection
App.Views.People = Backbone.View.extend({
	tagName: "ul",

	initialize: function() {
		//this.render();
	},

	render: function() {
		//Here we can pass this as a second parameter to keep the proper scope
		this.collection.each(function(person){
			var personView = new App.Views.Person({ model: person });
			this.$el.append( personView.render().el );
		}, this);

		return this;
	}
});

App.Views.Person = Backbone.View.extend({
	tagName: "li",
	//className: "person",
	//id: "person-id"

	//Separating it out a little now, point to the script with selector
	template: _.template( template("personTemplate") ),

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});

//Sample creation of Model and View
var peopleCollection = new App.Collections.People(
	[
		{name: "Chase Coney", age: 23, job: "Software Developer"},
		{name: "Sarah Daniels", age: 22, job: "Marketing Manager"},
		{name: "Murphy Judge Joe Brown", age: 65, job: "Garbage Man"}
	]
);
var peopleView = new App.Views.People({ collection: peopleCollection });

$(document.body).append(peopleView.render().el);

})();