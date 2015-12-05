(function(app) {
    app.controller('ProfileController', ['$scope', '$stateParams', 'authService', 'userService', function($scope, $stateParams, authService, userService) {
        authService.checkIfLoginRequired(function() {
            var me = authService.getMyDetails();
            $scope.myUserId = me.objectId;
            $scope.myFullName = me.firstName + " " + me.lastName;
            $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
            
            userService.getUserById($stateParams.userId, true).then(function(user) {
                $scope.profileImg = (user.photo || {}).url || "/img/user_unknown.png";
                $scope.name = user.firstName + " " + user.lastName;
                $scope.isMe = (user.objectId == me.objectId);
                $scope.about = user.bio;
                $scope.related_skills = user.related_skills;
                $scope.related_tools = user.related_tools;
                $scope.related_projects = user.related_projects;
                $scope.related_spaces = user.related_spaces;
                
                /*
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
            }, function(err) {
                alert("User not found");
            });
        });
    }]);
})(angular.module('track-chat.profile'));