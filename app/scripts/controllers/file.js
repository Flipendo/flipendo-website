'use strict';
/* global app */

/**
 * @ngdoc function
 * @name flipendoApp.controller:FileCtrl
 * @description
 * # FileCtrl
 * Controller of the flipendoApp
 */
app.controller('FileCtrl', ['$scope', '$location', '$http', '$routeParams', 'fileUploader', function ($scope, $location, $http, $routeParams, fileUploader) {
  $scope.file = fileUploader;
  if ($routeParams.fileID) {
    $scope.file.initSocket($routeParams.fileID);
  } else {
    $location.path('/');
  }
}]);
