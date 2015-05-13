'use strict';
/* global app */

/**
 * @ngdoc function
 * @name flipendoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flipendoApp
 */
app.controller('MainCtrl', ['$scope', '$timeout', '$http', 'fileUploader', function ($scope, $timeout, $http, fileUploader) {
  $scope.file = fileUploader;
  console.log(fileUploader);

  $http.get('/datasets/chunks_test.json').success(function(data) {
    $scope.file.chunks = data;
  });
}]);
