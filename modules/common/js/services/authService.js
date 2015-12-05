(function(app) {
    app.service('authService', function($http, $q, $location) {
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
                    if (response.status == 200)
                        callback(response.data);
                    else
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
    });
})(angular.module('track-chat.common'));