'use strict';

/**
 * @ngdoc function
 * @name flipendoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flipendoApp
 */
angular.module('flipendoApp')
  .controller('MainCtrl', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
    $scope.chunks = [];
    $scope.done = false;

    $http.get('/datasets/chunks_test.json').success(function(data) {
      $scope.chunks = data;
    });

    var appear;
    var disappear;

    disappear = function() {
      $scope.done = false;
      $timeout(appear, 3000);
    };
    appear = function() {
      $scope.done = true;
      $timeout(disappear, 3000);
    };

    $timeout(appear, 3000);
  }])
  .directive('progressCircle', function() {
    return {
      scope: {
        done: '=',
        chunks:   '=',
        progress: '=progress'
      },
      templateUrl: 'views/progress.html'
    };
  });
