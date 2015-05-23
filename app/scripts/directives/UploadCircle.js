'use strict';
/* global app */

app.directive('uploadCircle', function() {
  return {
    scope: {
      file: '='
    },
    link: function($scope) {
      $scope.randomUploaded = function() {
        return Math.floor((Math.random() * 4));
      };
    },
    templateUrl: 'views/partials/upload.html'
  };
});
