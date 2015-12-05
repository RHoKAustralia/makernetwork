(function(app) {

	app.factory('ResourceFactory', function($resource) {
		return function(url, params) {
			params = params || {};

            return $resource(url, params, {
                'get': {method: 'GET'},

                'save': {method: 'POST'},
                'create': {method: 'POST'},

                'edit': {method: 'PUT'},
                'update': {method: 'PUT'},

                'remove': {method: 'DELETE'},
                'delete': {method: 'DELETE'},

                'list': {method: 'GET', isArray: true},
                'query': {method: 'GET', isArray: true}
            });
		};
	});

})(angular.module('track-chat.common'));
