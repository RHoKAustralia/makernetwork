angular.module('track-chat.common', ['ngMaterial']);
angular.module('track-chat.home', [ 'ui.router','track-chat.common' ]);

(function(app) {
	app.config(["$stateProvider", function($stateProvider) {

		$stateProvider.state('home', {
			url : '/home',
			views : {
				"contents" : {
					templateUrl : 'modules/home/templates/home.html'
				}
			}
		});
	}]);
})(angular.module('track-chat.home'));
angular.module('track-chat.ping', [ 'ui.router' ]);

(function(app) {
	app.config(["$stateProvider", function($stateProvider) {

		$stateProvider.state('ping', {
			url : '/ping',
			views : {
				"contents" : {
					templateUrl : 'modules/ping/templates/ping.html'
				}
			}
		});
	}]);
})(angular.module('track-chat.ping'));
(function(app) {

	app.factory('ResourceFactory', ["$resource", function($resource) {
		return function(url, params) {
			params = params || {};

            return $resource(url, params, {
                'get': {method: 'GET'},

                'save': {method: 'POST'},
                'create': {method: 'POST'},

                'edit': {method: 'PUT'},
                'update': {method: 'PUT'},

                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},

                'list': {method: 'GET', isArray: true},
                'query': {method: 'GET', isArray: true}
            });
		};
	}]);

})(angular.module('track-chat.common'));

(function (app) {
    app.controller('HomeController', ["$scope", "home", function ($scope, home) {
        $scope.title = home.title;
        $scope.works = {
            seo: {
                totalclients: 26,
                keywords: 100,
                firstpage: 40,
                secondpage: 36,
                seoreq: 15,
                tasks: 25
            },
            adwords: {
                totalclients: 20,
                active: 15,
                inactive: 5,
                tasks: 25
            },
            web: {
                totalclients: 20,
                active: 15,
                inactive: 5,
                tasks: 25
            }
        };
    }]);
})(angular.module('track-chat.home'));
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

(function(app) {
	app.service('home', function() {
		return {
			title : 'Home service'
		};
	});
})(angular.module('track-chat.home'));
(function(app) {
	app.controller('PingController', ["$scope", function($scope) {
		$scope.ping = '';

	}]);
})(angular.module('track-chat.ping'));
(function(app) {

})(angular.module('track-chat.ping'));
angular.module('track-chat.3rdparty', ['ngRoute', 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate']);

angular.module('track-chat', ['config', 'track-chat.common', 'track-chat.3rdparty', 'track-chat.home', 'track-chat.ping', 'track-chat.seo']);
(function(app) {
	app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	}]);
})(angular.module('track-chat'));