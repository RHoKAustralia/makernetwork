(function(app) {
	app.directive('home', function() {
		return {
			restrict : 'E',
			templateUrl : 'modules/home/templates/directives/homeTemplate.tpl.html',
			link : function(scope, element, attrs) {
				scope.message = 'Active Clients';
			}
		};
	});
})(angular.module('track-chat.home'));
