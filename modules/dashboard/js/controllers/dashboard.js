(function (app) {
    app.controller('DashboardController', function ($scope, uiGmapGoogleMapApi) {
        $scope.dashboard = '';
        uiGmapGoogleMapApi.then(function (maps) {
            // alert("Map is ready");
            console.log(maps);
        });

    });
})(angular.module('track-chat.dashboard'));