'use strict';
/* global app */

app.directive('progressCircle', function() {
  return {
    scope: {
      file: '='
    },
    templateUrl: 'views/partials/progress.html'
  };
});
