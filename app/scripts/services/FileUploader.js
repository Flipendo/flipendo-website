'use strict';
/* global app, API_URL */

app.factory('fileUploader', ['$location', '$routeParams', 'Upload', function($location, $routeParams, Upload) {
  var progressValue = 0;
  var chunks = [];
  var status = 'waiting';
  var error = '';

  var done = function() {
    this.status = 'done';
  };

  var progress = function(evt) {
    progressValue = parseInt(100.0 * evt.loaded / evt.total);
  };

  var openSocket = function(id) {
    status = 'pending';
    console.log('socket', id);
  };

  var uploaded = function(data, s, headers, config) {
    /* jshint unused: false */
    if (s === 200) {
      status = 'pending';
      $location.path('/'+data.id);
    } else {
      status = 'error';
      error = data.error;
    }
    progressValue = 0;
  };

  var uploadError = function() {
    status = 'error';
    progressValue = 0;
  };

  var upload = function(files) {
    if (files && files.length) {
      Upload.upload({
        url: API_URL+'/upload',
        file: files[0]
      }).progress(progress).success(uploaded).error(uploadError);
      status = 'uploading';
    }
  };

  if ($routeParams.fileID) {
    openSocket($routeParams.fileID);
  }

  return {
    progress: progressValue,
    chunks: chunks,
    status: status,
    error: error,
    done: done,
    upload: upload,
  };
}]);
