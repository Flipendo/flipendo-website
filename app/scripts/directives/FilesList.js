'use strict';
/* global app */

app.directive('filesList', function() {
  return {
    scope: {
      files: '='
    },
    templateUrl: 'views/partials/files_list.html'
  };
});
