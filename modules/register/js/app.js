angular.module('track-chat.register', [ 'ui.router' ]);

(function(app) {
	app.config(function($stateProvider) {

		$stateProvider.state('register', {
			url : '/register',
			views : {
				"contents" : {
					templateUrl : 'modules/register/templates/register.html'
				}
			}
		});
	});
})(angular.module('track-chat.register'));