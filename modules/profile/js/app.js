angular.module('track-chat.profile', [ 'ui.router' ]);

(function(app) {
	app.config(function($stateProvider) {

		$stateProvider.state('profile', {
			url : '/profile',
			views : {
				"contents" : {
					templateUrl : 'modules/profile/templates/profile.html'
				}
			}
		});
	});
})(angular.module('track-chat.profile'));