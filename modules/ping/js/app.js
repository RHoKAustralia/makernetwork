angular.module('track-chat.ping', [ 'ui.router' ]);

(function(app) {
	app.config(function($stateProvider) {

		$stateProvider.state('ping', {
			url : '/ping',
			views : {
				"contents" : {
					templateUrl : 'modules/ping/templates/ping.html'
				}
			}
		});
	});
})(angular.module('track-chat.ping'));