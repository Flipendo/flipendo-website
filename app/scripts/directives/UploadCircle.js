'use strict';
/* global app */

app.directive('uploadCircle', function() {
  return {
    scope: {
      file: '='
    },
    link: function($scope, elem, attrs, controller) {
      $scope.randomUploaded = function() {
        return Math.floor((Math.random() * 4));
      };
    },
    templateUrl: 'views/partials/upload.html'
  };
});
