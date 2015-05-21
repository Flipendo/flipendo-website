'use strict';
/* global app, API_URL, io */

app.factory('fileUploader', ['$location', 'Upload', function($location, Upload) {
  var FileUploader = function() {
    this.progress = 0;
    this.chunks = [];
    this.status = 'waiting';
    this.error = '';
    this.socket = null;

    this.done = function() {
      this.status = 'done';
    };

    this.openSocket = function(id) {
      var self = this;
      this.status = 'pending';
      this.socket = io.connect(API_URL+'/'+id);

      this.socket.on('chunks', function(data) {
        self.chunks = data;
      });
    };

    this.upload = function(files) {
      if (files && files.length) {
        var self = this;
        Upload.upload({
          url: API_URL+'/upload',
          file: files[0]
        }).progress(function(evt) {
          self.progress = parseInt(100.0 * evt.loaded / evt.total);
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

    this.initSocket = function(id) {
      this.openSocket(id);
    };

  };
  return new FileUploader();
}]);
