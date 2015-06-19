Template.quiz1.events({
	"submit #project_form": function(event){
		event.preventDefault();
		var project = event.target.proj.value;
		var firstName = event.target.first.value;
		var lastName = event.target.last.value;
		var meteorURL = event.target.meteor.value;
		var githubURL = event.target.github.value;

		Projects.insert({project:project, firstName:firstName, lastName:lastName,
			meteorURL:meteorURL, githubURL:githubURL});
	}
});

Template.quiz1.helpers({
   projects: function(){return Projects.find({})},
 });

Template.tableRow.helpers({
	"click .delete-icon": function(){Projects.remove(this._id);}
});