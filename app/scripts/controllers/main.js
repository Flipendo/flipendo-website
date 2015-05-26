'use strict';
/* global API_URL, io, app */

/**
 * @ngdoc function
 * @name flipendoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flipendoApp
 */
app.controller('MainCtrl', ['$scope', '$timeout', '$http', 'fileUploader', function ($scope, $timeout, $http, fileUploader) {
  $scope.file = fileUploader;
  $scope.files = {};


  console.log('hello');
  var socket = io.connect(API_URL+'/');

  socket.on('connection', function() {
    console.log('connected');
  });

  socket.on('lfile', function(data) {
    console.log('Received file state', data);
    $scope.files[data.id] = data;
    $scope.$digest();
  });

  socket.on('lfiles', function(data) {
    console.log('received files', data);
    $scope.files = data;
    $scope.$digest();
  });
}]);
