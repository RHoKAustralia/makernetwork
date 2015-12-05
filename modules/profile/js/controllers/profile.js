(function(app) {
    app.controller('ProfileController', ['$scope', 'authService', function($scope, authService) {
        authService.checkIfLoginRequired(function() {
            var me = authService.getMyDetails();
            $scope.myFullName = me.firstName + " " + me.lastName;
            $scope.myProfilePhoto = me.profileUrl || "/img/user_unknown.png";
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
        });
    }]);
})(angular.module('track-chat.profile'));