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
  $scope.files = {};
  $scope.file = fileUploader;
  if ($routeParams.fileID) {
    var nsp = $scope.file.initSocket($routeParams.fileID);
    nsp.on('lfiles', function(data) {
      console.log('received files', data);
      $scope.files = data;
      $scope.$digest();
    });

    nsp.on('lfile', function(data) {
      console.log('Received file state', data);
      $scope.files[data.id] = data;
      $scope.$digest();
      console.log($scope.files);
    });

    nsp.on('files', function(data) {
      console.log('received files', data);
      $scope.files = data;
    });

    nsp.on('file', function(data) {
      console.log('Received file');
      if (data.length > 0 && $scope.file.status !== 'done' && $scope.file.status !== 'merging') {
        $scope.file.status = 'pending';
      }
      $scope.file.chunks = data.chunks;
      $scope.file.initComputedChunks();
      $scope.file.status = data.status;
      $scope.file.refreshChunksProgress();
    });

    nsp.on('chunks', function(data) {
      console.log('Received chunks');
      if (data.length > 0 && $scope.file.status !== 'done' && $scope.file.status !== 'merging') {
        $scope.file.status = 'pending';
      }
      $scope.file.chunks = data;
      $scope.file.initComputedChunks();
      $scope.file.refreshChunksProgress();
    });

    nsp.on('chunk', function(data) {
      console.log('Received chunk', data);
      $scope.file.chunks[parseInt(data.n)] = data;
      if ($scope.file.status !== 'done' && $scope.file.status !== 'merging') {
        $scope.file.status = 'pending';
      }
      $scope.file.updateComputedChunk(parseInt(data.n));
      if (data.done === true || data.error !== null) {
        $scope.file.refreshChunksProgress();
      }
    });

    nsp.on('merging', function() {
      console.log('Received merging');
      $scope.file.status = 'merging';
      $scope.$digest();
    });

    nsp.on('done', function() {
      console.log('Received done');
      $scope.file.status = 'done';
      $scope.$digest();
    });
  } else {
    $location.path('/');
  }
}]);
