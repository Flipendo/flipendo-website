'use strict';
/* global app, API_URL */

app.factory('fileUploader', ['$location', '$routeParams', 'Upload', function($location, $routeParams, Upload) {
  var FileUploader = function() {
    this.progress = 0;
    this.chunks = [];
    this.status = 'waiting';
    this.error = '';

    this.done = function() {
      this.status = 'done';
    };

    this.openSocket = function(id) {
      this.status = 'pending';
      console.log('socket', id);
    };

    this.upload = function(files) {
      if (files && files.length) {
        var self = this;
        Upload.upload({
          url: API_URL+'/upload',
          file: files[0]
        }).progress(function(evt) {
          self.progress = parseInt(100.0 * evt.loaded / evt.total) * 2;
        }).success(function(data, s, headers, config) {
          /* jshint unused: false */
          if (s === 200) {
            self.status = 'pending';
            $location.path('/'+data.id);
          } else {
            self.status = 'error';
            self.error = data.error;
          }
          self.progress = 0;
        }).error(function() {
          self.status = 'error';
          self.progress = 0;
        });
        this.status = 'uploading';
      }
    };

    if ($routeParams.fileID) {
      this.openSocket($routeParams.fileID);
    }

  };
  return new FileUploader();
}]);
