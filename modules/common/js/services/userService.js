(function(app) {
    app.service('userService', function($http, $q) {
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
    });
})(angular.module('track-chat.common'));