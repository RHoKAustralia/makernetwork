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