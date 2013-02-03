(function(){
	
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};

	window.template = function(id) {
		return _.template( $("#" + id).html() );
	};

	App.Models.Task = Backbone.Model.extend({});

	App.Collections.Tasks = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.Tasks = Backbone.View.extend({
		tagName: "ul",

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},

		addOne: function(task) {
			var taskView = new App.Views.Task({ model: task });
			this.$el.append( taskView.render().el );
		}
	});

	App.Views.Task = Backbone.View.extend({
		tagName: "li",

		template: template("taskTemplate"),

		events: {
			"click .edit": "editTask",
			"click .delete": "destroyTask"
		},

		initialize: function() {
			//When the model data is changed, update the view
			this.model.on("change", this.render, this);
			this.model.on("destroy", this.remove, this);
		},

		editTask: function() {
			var newTaskTitle = prompt("New title?", this.model.get("title"));

			if( ! $.trim(newTaskTitle) ) return;

			this.model.set("title", newTaskTitle);
		},

		destroyTask: function() {
			this.model.destroy();
		},

		remove: function() {
			this.$el.remove();
		},

		render: function() {
			var template = this.template( this.model.toJSON() );
			this.$el.html( template );
			return this;
		}
	});






	var tasksCollection = new App.Collections.Tasks([
		{
			title: "This is a task",
			priority: 1
		},
		{
			title: "This is another task",
			priority: 2
		},
		{
			title: "This is a third task",
			priority: 3
		}
	]);

	var tasksView = new App.Views.Tasks({ collection: tasksCollection });
	tasksView.render();
	
	$(document.body).html(tasksView.el);


})();