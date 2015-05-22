'use strict';
/* global app */

app.directive('uploadCircle', function() {
  return {
    scope: {
      randomUploaded: '&',
      file: '='
    },
    templateUrl: 'views/partials/upload.html'
  };
});
