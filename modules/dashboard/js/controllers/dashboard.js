(function (app) {
  app.controller('DashboardController', function ($scope, $location, uiGmapGoogleMapApi, authService, userService) {

      $scope.map = {center: {latitude: -37.8602828, longitude: 145.079616}, zoom: 8};

      $scope.search = {
          query:''
      };
      $scope.options = {
          scrollwheel: false
      };
      $scope.randomMarkers = [];

      var createRandomMarker = function (lat, long, user_id, username) {
          var latitude = lat;
          var longitude = long;
          var ret = {
              latitude: latitude,
              longitude: longitude,
              title: username,
              show: false
          }
          ret.onClick = function () {
              ret.show = !ret.show;
          };
          ret["id"] = user_id;
          return ret;
      };

      var markers = [];
      markers.push(createRandomMarker(-37.8602828, 145.079616, 1, "This is a Pin with ID 1"));
      markers.push(createRandomMarker(-38, 145, 2, "This is a Pin with ID 2"));

      $scope.randomMarkers = markers;

    authService.checkIfLoginRequired(function () {
      var me = authService.getMyDetails();
      $scope.myUserId = me.objectId;
      $scope.myFullName = me.firstName + " " + me.lastName;
      $scope.myProfilePhoto = (me.photo || {}).url || "/img/user_unknown.png";
      $scope.dashboard = '';
      uiGmapGoogleMapApi.then(function (maps) {
                // alert("Map is ready");
                console.log(maps);
              });

      userService.listUsers('').then(function (users) {
        console.log(users);

        $scope.users = users.results;

        /*
         $scope.profileImg = (user.photo || {}).url || "/img/user_unknown.png";
         $scope.name = user.firstName + " " + user.lastName;
         $scope.isMe = (user.objectId == me.objectId);
         $scope.about = user.bio;
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
       }, function (err) {
        alert("Users not found");
      });

      userService.listUsersWithTools('').then(function (users) {
        console.log(users);

        $scope.user_tools = users.results;
       }, function (err) {
        alert("Users not found");
      });

      userService.listUsersWithProjects('').then(function (users) {
        console.log(users);

        $scope.user_projects = users.results;
       }, function (err) {
        alert("Users not found");
      });
    });
  });
})(angular.module('track-chat.dashboard'));