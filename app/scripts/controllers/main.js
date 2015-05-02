'use strict';

/**
 * @ngdoc function
 * @name flipendoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flipendoApp
 */
angular.module('flipendoApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/datasets/chunks_test.json').success(function(data) {
      $scope.chunks = data;
    });
  }])
  .directive('progressCircle', function() {
    return {
      scope: {
        chunks:   '=',
        progress: '=progress'
      },
      templateUrl: 'views/progress.html'
    };
  });
