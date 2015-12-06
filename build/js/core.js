angular.module('track-chat.common', ['uiGmapgoogle-maps']);
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
(function(app) {
    app.service('authService', ["$http", "$q", "$location", function($http, $q, $location) {
        //TODO: Move to common configuration
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
        //TODO: Move to common configuration
        var url = "https://api.parse.com/1";
        var appID = 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85';
        var restApiKey = 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u';
        
        function makeRequest(method, resource, params) {
            return {
                method: method,
                url: url + resource,
                params: params,
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
        
        this.getUserById = function(userId, bFullDetails) {
            var req = makeRequest('GET', '/users/' + userId);
            var df = $q.defer();
            var up = $http(req);
            
            //TODO: This is undesirable. I want all this related information in one request!
            if (bFullDetails) {
                
                var reqProjects = makeRequest('GET', '/classes/Project');
                reqProjects.params = {
                    where: {"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":userId},"key":"projects"}}
                };
                var pProjects = $http(reqProjects);
                
                var reqSkills = makeRequest("GET", "/classes/Skill");
                reqSkills.params = {
                    where: {"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":userId},"key":"skills"}}
                };
                var pSkills = $http(reqSkills);
                
                var reqTool = makeRequest("GET", "/classes/Tool");
                reqTool.params = {
                    where: {"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":userId},"key":"tools"}}
                };
                var pTool = $http(reqTool);
                
                var reqSpaces = makeRequest("GET", "/classes/Space");
                reqSpaces.params = {
                    where: {"$relatedTo":{"object":{"__type":"Pointer","className":"_User","objectId":userId},"key":"spaces"}}
                };
                
                var pSpaces = $http(reqSpaces);
                
                $q.all([
                    up,
                    pProjects,
                    pSkills,
                    pTool,
                    pSpaces
                ]).then(function(results) {
                    var userDetails = results[0].data;
                    var relatedProjects = results[1].data.results;
                    var relatedSkills = results[2].data.results
                    var relatedTools = results[3].data.results;
                    var relatedSpaces = results[4].data.results;
                    
                    for (var i = 0; i < relatedProjects.length; i++) {
                        relatedProjects[i].imageUrl = (relatedProjects[i].photo || {}).url || null;
                    }
                    
                    userDetails.related_projects = relatedProjects;
                    userDetails.related_skills = relatedSkills;
                    userDetails.related_tools = relatedTools;
                    userDetails.related_spaces = relatedSpaces;
                    df.resolve(userDetails);
                }, function(err) {
                    df.reject(err);
                });
            } else {
                up.then(function(response) {
                    df.resolve(response.data);
                }, function(err) {
                    df.reject(err);
                });
            }
            return df.promise;
        };

        this.listUsers = function(filter) {
            reqparams = {
                include: "tool"
            };
            var req = makeRequest('GET', '/users', reqparams);
            var df = $q.defer();
            $http(req).then(function(response) {
                df.resolve(response.data);
            }, function(err) {
                df.reject(err);
            });
            return df.promise;
        };

        this.listUsersWithTools = function(filter) {
            reqparams = {
                where: {"tools":{"$inQuery":{"where": {"name": {"$exists": true}},"className":"Tool"}}},
                include: "tool"
            };
            var req = makeRequest('GET', '/users', reqparams);
            var df = $q.defer();

            $http(req).then(function(response) {
                df.resolve(response.data);
            }, function(err) {
                df.reject(err);
            });
            return df.promise;

        };

        this.listUsersWithProjects = function(filter) {
            reqparams = {
                where: {"projects":{"$inQuery":{"where": {"name": {"$exists": true}},"className":"Project"}}},
                include: "project"
            };
            var req = makeRequest('GET', '/users', reqparams);
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
(function (app) {
  app.controller('DashboardController', ["$scope", "$location", "uiGmapGoogleMapApi", "authService", "userService", function ($scope, $location, uiGmapGoogleMapApi, authService, userService) {

      $scope.map = {center: {latitude: -37.8602828, longitude: 145.079616}, zoom: 8};

      $scope.search = {
          query:''
      };
      $scope.options = {
          scrollwheel: false
      };
      $scope.randomMarkers = [];

      var createRandomMarker = function (lat, long, user_id, username) {
          var latitude = lat;
          var longitude = long;
          var ret = {
              latitude: latitude,
              longitude: longitude,
              title: username,
              show: false
          }
          ret.onClick = function () {
              ret.show = !ret.show;
          };
          ret["id"] = user_id;
          return ret;
      };

      var markers = [];
      markers.push(createRandomMarker(-37.8602828, 145.079616, 1, "This is a Pin with ID 1"));
      markers.push(createRandomMarker(-38, 145, 2, "This is a Pin with ID 2"));

      $scope.randomMarkers = markers;

    authService.checkIfLoginRequired(function () {
      var me = authService.getMyDetails();
      $scope.myUserId = me.objectId;
      $scope.myFullName = me.firstName + " " + me.lastName;
      $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
      $scope.dashboard = '';
      uiGmapGoogleMapApi.then(function (maps) {
                // alert("Map is ready");
                console.log(maps);
              });

      userService.listUsers('').then(function (users) {
        console.log(users);

        $scope.users = users.results;

        /*
         $scope.profileImg = (user.photo || {}).url || "/img/user_unknown.png";
         $scope.name = user.firstName + " " + user.lastName;
         $scope.isMe = (user.objectId == me.objectId);
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
         */
       }, function (err) {
        alert("Users not found");
      });

      userService.listUsersWithTools('').then(function (users) {
        console.log(users);

        $scope.user_tools = users.results;
       }, function (err) {
        alert("Users not found");
      });

      userService.listUsersWithProjects('').then(function (users) {
        console.log(users);

        $scope.user_projects = users.results;
       }, function (err) {
        alert("Users not found");
      });
    });
  }]);
})(angular.module('track-chat.dashboard'));
(function(app) {

})(angular.module('track-chat.dashboard'));
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
(function (app) {
    app.controller('HomeController', ["$scope", "home", "uiGmapGoogleMapApi", function ($scope, home,uiGmapGoogleMapApi) {
        $scope.title = home.title;

        $scope.map = { center: { latitude: -37.8602828, longitude: 145.079616 }, zoom: 8 };
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
(function(app) {
    app.controller('ProfileController', ['$scope', '$stateParams', 'authService', 'userService', function($scope, $stateParams, authService, userService) {
        authService.checkIfLoginRequired(function() {
            var me = authService.getMyDetails();
            $scope.myUserId = me.objectId;
            $scope.myFullName = me.firstName + " " + me.lastName;
            $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
            
            function getPlaceMarkers(spaces) {
                var locations = [];
                for (var i = 0; i < spaces.length; i++) {
                    if (spaces[i].location) {
                        locations.push({ id: spaces[i].objectId, longitude: spaces[i].location.longitude, latitude: spaces[i].location.latitude });
                    }
                }
                return locations;
            }
            
            userService.getUserById($stateParams.userId, true).then(function(user) {
                $scope.map = {center: {latitude: -37.8602828, longitude: 145.079616}, zoom: 8};
                $scope.placeMarkers = getPlaceMarkers(user.related_spaces);
                
                $scope.profileImg = (user.photo || {}).url || "/img/user_unknown.png";
                $scope.name = user.firstName + " " + user.lastName;
                $scope.isMe = (user.objectId == me.objectId);
                $scope.about = user.bio;
                $scope.related_skills = user.related_skills;
                $scope.related_tools = user.related_tools;
                $scope.related_projects = user.related_projects;
                $scope.related_spaces = user.related_spaces;
            }, function(err) {
                alert("User not found");
            });
        });
    }]);
})(angular.module('track-chat.profile'));
(function(app) {

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