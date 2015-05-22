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

  $scope.randomUploaded = function() {
    return Math.floor((Math.random() * 2));
  };
}]);
