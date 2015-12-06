(function (app) {
    app.controller('HomeController', function ($scope, home,uiGmapGoogleMapApi) {
        $scope.title = home.title;

        $scope.map = { center: { latitude: -37.8602828, longitude: 145.079616 }, zoom: 8 };
    });
})(angular.module('track-chat.home'));