(function (app) {
    app.controller('HomeController', function ($scope, home) {
        $scope.title = home.title;
        $scope.works = {
            seo: {
                totalclients: 26,
                keywords: 100,
                firstpage: 40,
                secondpage: 36,
                seoreq: 15,
                tasks: 25
            },
            adwords: {
                totalclients: 20,
                active: 15,
                inactive: 5,
                tasks: 25
            },
            web: {
                totalclients: 20,
                active: 15,
                inactive: 5,
                tasks: 25
            }
        };
    });
})(angular.module('track-chat.home'));