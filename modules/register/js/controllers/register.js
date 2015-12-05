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