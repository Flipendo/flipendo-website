'use strict';
/* global app, API_URL, io */

app.factory('fileUploader', ['$rootScope', '$location', 'Upload', function($rootScope, $location, Upload) {
  var FileUploader = function() {
    this.id = '';
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
      this.socket = io.connect(API_URL+'/'+id);

      this.socket.on('chunks', function(data) {
        console.log('Received chunks', data);
        if (data.length > 0 && self.status !== 'done' && self.status !== 'merging') {
          self.status = 'pending';
        }
        self.chunks = data;
        self.refreshChunksProgress();
        $rootScope.$digest();
      });

      this.socket.on('chunk', function(data) {
        console.log('Received chunk', data);
        self.chunks[data.n] = data;
        if (self.status !== 'done' && self.status !== 'merging') {
          self.status = 'pending';
        }
        if (data.done === true || data.error !== null) {
          self.refreshChunksProgress();
        }
        $rootScope.$digest();
      });

      this.socket.on('merging', function() {
        console.log('Received merging');
        self.status = 'merging';
        $rootScope.$digest();
      });

      this.socket.on('done', function() {
        console.log('Received done');
        self.status = 'done';
        $rootScope.$digest();
      });
    };

    this.refreshChunksProgress = function() {
      var done = 0;
      for (var i in this.chunks) {
        if (this.chunks[i].error) {
          this.error = this.chunks[i].error;
        }
        if (this.chunks[i].done) {
          done++;
        }
      }
      this.progress = parseInt(100 * done / this.chunks.length);
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
      this.id = id;
      this.openSocket(id);
    };

  };
  return new FileUploader();
}]);
