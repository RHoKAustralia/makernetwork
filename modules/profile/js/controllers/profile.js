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