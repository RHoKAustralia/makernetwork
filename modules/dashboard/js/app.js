angular.module('track-chat.dashboard', [ 'ui.router' ]);

(function(app) {
	app.config(function($stateProvider) {

		$stateProvider.state('dashboard', {
			url : '/dashboard',
			views : {
				"contents" : {
					templateUrl : 'modules/dashboard/templates/dashboard.html'
				}
			}
		});
	});
})(angular.module('track-chat.dashboard'));