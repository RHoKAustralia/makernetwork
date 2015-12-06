(function(app) {
    app.service('userService', function($http, $q) {
        //TODO: Move to common configuration
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
            var req = makeRequest('GET', '/users');
            var df = $q.defer();
            $http(req).then(function(response) {
                df.resolve(response.data);
            }, function(err) {
                df.reject(err);
            });
            return df.promise;
        }
    });
})(angular.module('track-chat.common'));