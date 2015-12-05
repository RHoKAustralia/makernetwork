(function (app) {
    app.controller('RegisterController', function ($scope, $http) {
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
                emailVerified: true,
                email: $scope.user.email,
                firstName: $scope.user.first,
                lastName: $scope.user.last,
                location: {latitude: 30, longitude: 30},
                phone: $scope.user.phone
            };
            console.log(register);
            var req = {
                method: 'POST',
                url: 'https://api.parse.com/1/users',
                headers: {
                    'X-Parse-Application-Id': 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85',
                    'X-Parse-REST-API-Key': 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u',
                    'Content-Type': "application/json",
                    'X-Parse-Revocable-Session': 1
                },
                data: {
                    username: $scope.user.email,
                    "password": $scope.user.password,
                    //"emailVerified": true,
                    "email": $scope.user.email,
                    "firstName": $scope.user.first,
                    "lastName": $scope.user.last,
                    "location": {__type: "GeoPoint", latitude: $scope.user.latitude, longitude: $scope.user.longitude},
                    "phone": $scope.user.phone
                }
                //data: {"username":"cooldude6","password":"p_n7!-e8","phone":"415-392-0202"}
            };

            //var config = {
            //    'X-Parse-Application-Id': 'LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85',
            //    'X-Parse-REST-API-Key': 'MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u',
            //    'Content-Type': "application/json",
            //    //'Access-Control-Request-Headers': "accept, origin, LkDEH7w5Ls45AWY88HvMBPQQrnaQtsWE1IuizM85, MRze2gVwcEO0349p2YWhU55gOPNbE8y8oGEBsi4u, application/json",
            //    //'Access-Control-Request-Method': "POST",
            //    //'Access-Control-Allow-Origin':"api.parse.com, *"
            //
            //};

            $http(req).then(function () {
                //$scope.PostDataResponse = data;
                console.log("Success");
            },function(err){
                console.log(err);
            });

            //$http.post("https://api.parse.com/1/classes/user", register, config).success(function (data, status, headers, config) {
            //    $scope.PostDataResponse = data;
            //    console.log(data);
            //});
        };

    });
})(angular.module('track-chat.register'));