angular.module('track-chat.dashboard', [ 'ui.router' ]);

(function(app) {
	app.config(["$stateProvider", function($stateProvider) {

		$stateProvider.state('dashboard', {
			url : '/dashboard',
			views : {
				"contents" : {
					templateUrl : 'modules/dashboard/templates/dashboard.html'
				}
			}
		});
	}]);
})(angular.module('track-chat.dashboard'));
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
angular.module('track-chat.login', [ 'ui.router' ]);

(function(app) {
	app.config(["$stateProvider", function($stateProvider) {

		$stateProvider.state('login', {
			url : '/login',
			views : {
				"contents" : {
					templateUrl : 'modules/login/templates/login.html'
				}
			}
		});
	}]);
})(angular.module('track-chat.login'));
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
angular.module('track-chat.profile', [ 'ui.router' ]);

(function(app) {
	app.config(["$stateProvider", function($stateProvider) {

		$stateProvider.state('profile', {
			url : '/profile',
			views : {
				"contents" : {
					templateUrl : 'modules/profile/templates/profile.html'
				}
			}
		});
	}]);
})(angular.module('track-chat.profile'));
angular.module('track-chat.register', [ 'ui.router' ]);

(function(app) {
	app.config(["$stateProvider", function($stateProvider) {

		$stateProvider.state('register', {
			url : '/register',
			views : {
				"contents" : {
					templateUrl : 'modules/register/templates/register.html'
				}
			}
		});
	}]);
})(angular.module('track-chat.register'));
(function(app) {
	app.controller('DashboardController', ["$scope", function($scope) {
		$scope.dashboard = '';

	}]);
})(angular.module('track-chat.dashboard'));
(function(app) {

})(angular.module('track-chat.dashboard'));
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
	app.service('home', function() {
		return {
			title : 'Home service'
		};
	});
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
	app.controller('LoginController', ["$scope", function($scope) {
		$scope.login = 'Login';

	}]);
})(angular.module('track-chat.login'));
(function(app) {

})(angular.module('track-chat.login'));
(function(app) {
	app.controller('PingController', ["$scope", function($scope) {
		$scope.ping = '';

	}]);
})(angular.module('track-chat.ping'));
(function(app) {

})(angular.module('track-chat.ping'));
(function(app) {
    app.controller('ProfileController', ['$scope', function($scope) {
        $scope.profileImg = "img/tracy.jpg";
        $scope.name = "Tracey Nguyen";
        $scope.about = "INSERT SOME DESCRIPTION HERE";
        $scope.skills = [
            { name: "Advertising" },
            { name: "Creative Strategy" },
            { name: "Logo Design" },
            { name: "Creative Direction" },
            { name: "Art Direction" },
            { name: "Graphic Design" },
            { name: "Brand Development" },
            { name: "Digital Strategy" },
            { name: "Integrated Marketing" },
            { name: "Typography" }
        ];
        $scope.tools = [
            { name: "Spanner" },
            { name: "Hammer" }
        ];
        $scope.projects = [
            { imageUrl: "http://renswijnmalen.nl/bootstrap/desktop_mobile.png", status: "Help Wanted", name: "Activist Print", owner: "The Andy Warhol Museum",  description: "Activist Print is inspired by the long history of art being used to raise awareness of contemporary issues and inspire change" },
            { imageUrl: "http://renswijnmalen.nl/bootstrap/mobile.png", status: "In Progress", name: "Radical Renewable Art + Activism Fund", owner: "Ellie Harrison", description: "INSERT DESCRIPTION HERE" },
            { imageUrl: "http://renswijnmalen.nl/bootstrap/desktop.png", status: "Completed", name: "Coorain Calendar 2016", owner: "Ellie Harrison", description: "INSERT DESCRIPTION HERE" },
            { imageUrl: "http://renswijnmalen.nl/bootstrap/mobile.png", status: "Completed", name: "Help fund the rebuild of the Delish Glass furnace", owner: "Chelsea and Jeremy Griffith", description: "INSERT DESCRIPTION HERE" }
        ];
        $scope.spaces = [
            { imageUrl: "http://renswijnmalen.nl/bootstrap/desktop_mobile.png", name: "Swinburne University of Technology", description: "This is the venue for the RHoK 2015 summer hackathon", address: "John St", city: "Hawthorn", state: "Victoria", country: "Australia" }
        ];
    }]);
})(angular.module('track-chat.profile'));
(function(app) {

})(angular.module('track-chat.profile'));
(function (app) {
    app.controller('RegisterController', ["$scope", "$http", function ($scope, $http) {
        $scope.register = 'Register';

        $scope.user = {
            first: "",
            last: "",
            password: "",
            email: "",
            phone: "",
            latitude: 0,
            longitude:0
        };

        $scope.registerClick = function () {
            var register = {
                username: $scope.user.email,
                password: $scope.user.password,
                emailVerified: true,
                email: $scope.user.email,
                firstName: $scope.user.first,
                lastName: $scope.user.last,
                location: {latitude: 30, longitude: 30},
                phone: $scope.user.phone
            };
            console.log(register);
            var req = {
                method: 'POST',
                url: 'https://api.parse.com/1/users',
                headers: {
                    'X-Parse-Application-Id': 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85',
                    'X-Parse-REST-API-Key': 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u',
                    'Content-Type': "application/json",
                    'X-Parse-Revocable-Session': 1
                },
                data: {
                    username: $scope.user.email,
                    "password": $scope.user.password,
                    //"emailVerified": true,
                    "email": $scope.user.email,
                    "firstName": $scope.user.first,
                    "lastName": $scope.user.last,
                    "location": {__type: "GeoPoint", latitude: $scope.user.latitude, longitude: $scope.user.longitude},
                    "phone": $scope.user.phone
                }
                //data: {"username":"cooldude6","password":"p_n7!-e8","phone":"415-392-0202"}
            };

            //var config = {
            //    'X-Parse-Application-Id': 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85',
            //    'X-Parse-REST-API-Key': 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u',
            //    'Content-Type': "application/json",
            //    //'Access-Control-Request-Headers': "accept, origin, LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85, MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u, application/json",
            //    //'Access-Control-Request-Method': "POST",
            //    //'Access-Control-Allow-Origin':"api.parse.com, *"
            //
            //};

            $http(req).then(function () {
                //$scope.PostDataResponse = data;
                console.log("Success");
            },function(err){
                console.log(err);
            });

            //$http.post("https://api.parse.com/1/classes/user", register, config).success(function (data, status, headers, config) {
            //    $scope.PostDataResponse = data;
            //    console.log(data);
            //});
        };

    }]);
})(angular.module('track-chat.register'));
(function (app) {
    app.service('User', function () {
        return {
            title: 'Registration service'
        };
    });
})(angular.module('track-chat.register'));
angular.module('track-chat.3rdparty', ['ngRoute', 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate']);

angular.module('track-chat', ['config', 'track-chat.common', 'track-chat.3rdparty', 'track-chat.home', 'track-chat.ping', 'track-chat.login','track-chat.register', 'track-chat.dashboard', 'track-chat.profile']);
(function(app) {
	app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	}]);
})(angular.module('track-chat'));