angular.module('track-chat.home', [ 'ui.router','track-chat.common' ]);

(function(app) {
	app.config(function($stateProvider) {

		$stateProvider.state('home', {
			url : '/home',
			views : {
				"contents" : {
					templateUrl : 'modules/home/templates/home.html'
				}
			}
		});
	});
})(angular.module('track-chat.home'));