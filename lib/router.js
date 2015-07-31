Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here .... 
});

Router.route('/', {name: 'welcome'});
Router.route('/about', {name: 'about'});
Router.route('/quiz1', {name: 'quiz1'});
Router.route('/quiz2', {name: 'quiz2'});
Router.route('/makeup', {name: 'makeup'});
