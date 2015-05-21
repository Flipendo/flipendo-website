'use strict';

/**
 * @ngdoc overview
 * @name flipendoApp
 * @description
 * # flipendoApp
 *
 * Main module of the application.
 */
var app = angular
  .module('flipendoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:fileID', {
        templateUrl: 'views/detail.html',
        controller: 'FileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
