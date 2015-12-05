angular.module('track-chat.common', ['ngMaterial','uiGmapgoogle-maps']);
angular.module('track-chat.dashboard', [ 'ui.router' ,'uiGmapgoogle-maps']);

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
angular.module('track-chat.home', [ 'ui.router','track-chat.common','uiGmapgoogle-maps' ]);

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
            url : '/profile/:userId',
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
(function (app) {
    app.controller('HomeController', ["$scope", "home", "uiGmapGoogleMapApi", function ($scope, home,uiGmapGoogleMapApi) {
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

})(angular.module('track-chat.dashboard'));
(function (app) {
    app.controller('DashboardController', ['$scope', '$location', 'uiGmapGoogleMapApi', 'authService', function ($scope, $location, uiGmapGoogleMapApi, authService) {
        authService.checkIfLoginRequired(function() {
            var me = authService.getMyDetails();
            $scope.myFullName = me.firstName + " " + me.lastName;
            $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
            $scope.dashboard = '';
            uiGmapGoogleMapApi.then(function (maps) {
                // alert("Map is ready");
                console.log(maps);
            });
        });
    }]);
})(angular.module('track-chat.dashboard'));
(function(app) {
    app.service('authService', ["$http", "$q", "$location", function($http, $q, $location) {
        var url = "https://api.parse.com/1";
        var appID = 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85';
        var restApiKey = 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u';
        
        var _this = this;
        
        function makeRequest(method, resource, bDoNotIncludeToken) {
            var req = {
                method: method,
                url: url + resource,
                headers: {
                    'X-Parse-Application-Id': appID,
                    'X-Parse-REST-API-Key': restApiKey,
                    'Content-Type': "application/json",
                    'X-Parse-Revocable-Session': 1
                }
            };
            if (!bDoNotIncludeToken) {
                var me = _this.getMyDetails();
                if (me != null)
                    req.headers['X-Parse-Session-Token'] = me.sessionToken;
            }
            return req;
        }
        
        var _me = null;
        
        this.getMyDetails = function() {
            if (window.localStorage["parseSession"] != null) {
                _me = JSON.parse(window.localStorage["parseSession"]);
                return _me;
            }
            return null;
        }
        
        /**
         * Checks if the currently cached session is still valid. The specified callback is invoked if it is true
         */
        this.checkIfLoginRequired = function(callback) {
            var bHasSession = false;
            var bHasUnverifiedSession = false;
            if (window.localStorage["parseSession"] != null)
                bHasSession = true;
            if (_me == null)
                bHasUnverifiedSession = true;
            
            if (bHasSession && !bHasUnverifiedSession) {
                callback(_me); //This session is okay
                return;
            }
            
            var badSession = function() {
                _me = null;
                delete window.localStorage["parseSession"];
                $location.path("/login");
            };
            
            if (bHasUnverifiedSession) {
                var req = makeRequest('GET', '/users/me');
                $http(req).then(function(response) {
                    if (response.status == 200) {
                        _me = response.data;
                        window.localStorage["parseSession"] = JSON.stringify(_me);
                        callback(response.data);
                    } else
                        badSession();
                }, function(err) {
                    badSession();
                });
            } else {
                badSession();
            }
        };
        
        this.login = function(username, password) {
            var result = $q.defer();
            var req = makeRequest('GET', '/login', true);
            req.params = {
                username: username,
                password: password
            };
            return $http(req).then(function(response) {
                window.localStorage["parseSession"] = JSON.stringify(response.data);
                _me = response.data;
                result.resolve(_this.me);
            }, function(err) {
                result.reject(err);
            });
            
            return result.promise;
        };
        
        this.logout = function() {
            var req = makeRequest('POST', '/logout');
            return $http(req).then(function() {
                _me = null;
                $location.path("/home");
            }, function(err) {
                console.warn(err);
                $location.path("/home");
            })
            
        };
    }]);
})(angular.module('track-chat.common'));
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

(function(app) {
    app.service('userService', ["$http", "$q", function($http, $q) {
        var url = "https://api.parse.com/1";
        var appID = 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85';
        var restApiKey = 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u';
        
        function makeRequest(method, resource) {
            return {
                method: method,
                url: url + resource,
                headers: {
                    'X-Parse-Application-Id': appID,
                    'X-Parse-REST-API-Key': restApiKey,
                    'Content-Type': "application/json",
                    'X-Parse-Revocable-Session': 1
                }
            };
        }
        
        this.registerUser = function(args) {
            var req = makeRequest('POST', '/users');
            req.data = args;
            return $http(req);
        };
        
        this.getUserById = function(userId) {
            var req = makeRequest('GET', '/users/' + userId);
            var df = $q.defer();
            $http(req).then(function(response) {
                df.resolve(response.data);
            }, function(err) {
                df.reject(err);
            });
            return df.promise;
        };
    }]);
})(angular.module('track-chat.common'));
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
    app.controller('LoginController', ['$scope', '$location', 'authService', function($scope, $location, authService) {
        $scope.login = 'Login';
        $scope.username = '';
        $scope.password = '';
        $scope.loginClick = function() {
            authService.login($scope.username, $scope.password).then(function() {
                $location.path("/dashboard");
            }, function(err) {
                alert("An error occurred authenticating: " + err);
            });
        };
    }]);
})(angular.module('track-chat.login'));
(function(app) {

})(angular.module('track-chat.login'));
(function(app) {

})(angular.module('track-chat.ping'));
(function(app) {
	app.controller('PingController', ["$scope", function($scope) {
		$scope.ping = '';

	}]);
})(angular.module('track-chat.ping'));
(function(app) {

})(angular.module('track-chat.profile'));
(function(app) {
    app.controller('ProfileController', ['$scope', '$stateParams', 'authService', 'userService', function($scope, $stateParams, authService, userService) {
        authService.checkIfLoginRequired(function() {
            var me = authService.getMyDetails();
            $scope.myFullName = me.firstName + " " + me.lastName;
            $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
            
            userService.getUserById($stateParams.userId).then(function(user) {
                $scope.profileImg = (user.photo || {}).url || "/img/user_unknown.png";
                $scope.name = user.firstName + " " + user.lastName;
                $scope.about = user.bio;
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
            }, function(err) {
                alert("User not found");
            });
        });
    }]);
})(angular.module('track-chat.profile'));
(function (app) {
    app.controller('RegisterController', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
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
                //emailVerified: true,
                email: $scope.user.email,
                firstName: $scope.user.first,
                lastName: $scope.user.last,
                location: {__type: "GeoPoint", latitude: 30, longitude: 30},
                phone: $scope.user.phone
            };
            userService.registerUser(register).then(function () {
                alert("User account created. A verification email has been sent to your specified email address");
                $location.path("/home");
            }, function(err){
                alert("An error occurred creating your user account: " + err);
            });
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
angular.module('track-chat.3rdparty', ['ngRoute', 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'uiGmapgoogle-maps']);

angular.module('track-chat', ['config', 'track-chat.common', 'track-chat.3rdparty', 'track-chat.home', 'track-chat.ping', 'track-chat.login','track-chat.register', 'track-chat.dashboard', 'track-chat.profile']);

(function(app) {
	app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
	}]);
})(angular.module('track-chat'));