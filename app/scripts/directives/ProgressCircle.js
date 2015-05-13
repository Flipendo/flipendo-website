'use strict';
/* global app */

app.directive('progressCircle', function() {
  return {
    scope: {
      file: '='
    },
    templateUrl: 'views/progress.html'
  };
});
