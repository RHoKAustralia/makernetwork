(function(app) {
	app.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	});
})(angular.module('track-chat'));