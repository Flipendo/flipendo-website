'use strict';
/* global app */

app.directive('uploadCircle', function() {
  return {
    scope: {
      file: '='
    },
    templateUrl: 'views/partials/upload.html'
  };
});
