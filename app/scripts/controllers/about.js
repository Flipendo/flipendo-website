'use strict';

/**
 * @ngdoc function
 * @name flipendoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flipendoApp
 */
angular.module('flipendoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
