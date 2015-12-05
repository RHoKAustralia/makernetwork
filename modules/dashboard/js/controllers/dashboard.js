(function (app) {
    app.controller('DashboardController', ['$scope', '$location', 'uiGmapGoogleMapApi', 'authService', function ($scope, $location, uiGmapGoogleMapApi, authService) {
        authService.checkIfLoginRequired(function() {
            var me = authService.getMyDetails();
            $scope.myUserId = me.objectId;
            $scope.myFullName = me.firstName + " " + me.lastName;
            $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
            $scope.dashboard = '';
            uiGmapGoogleMapApi.then(function (maps) {
                // alert("Map is ready");
                console.log(maps);
            });
        });
    }]);
})(angular.module('track-chat.dashboard'));