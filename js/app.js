angular.module('track-chat.3rdparty', ['ngRoute', 'ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate']);

angular.module('track-chat', ['config', 'track-chat.common', 'track-chat.3rdparty', 'track-chat.home', 'track-chat.ping', 'track-chat.login']);