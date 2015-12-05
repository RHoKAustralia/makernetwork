angular.module('track-chat.login', [ 'ui.router' ]);

(function(app) {
	app.config(function($stateProvider) {

		$stateProvider.state('login', {
			url : '/login',
			views : {
				"contents" : {
					templateUrl : 'modules/login/templates/login.html'
				}
			}
		});
	});
})(angular.module('track-chat.login'));