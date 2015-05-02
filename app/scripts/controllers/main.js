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
    $scope.status = 'pending';

    $http.get('/datasets/chunks_test.json').success(function(data) {
      $scope.chunks = data;
    });

    var appear;
    var disappear;

    disappear = function() {
      $scope.status = 'pending';
      $timeout(appear, 3000);
    };
    appear = function() {
      $scope.status = 'done';
      $timeout(disappear, 3000);
    };

    $timeout(appear, 3000);
  }])
  .directive('progressCircle', function() {
    return {
      scope: {
        status: '=',
        chunks:   '=',
        progress: '=progress'
      },
      templateUrl: 'views/progress.html'
    };
  });
