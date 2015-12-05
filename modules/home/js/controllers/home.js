(function (app) {
    app.controller('HomeController', function ($scope, home,uiGmapGoogleMapApi) {
        $scope.title = home.title;

        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    });
})(angular.module('track-chat.home'));