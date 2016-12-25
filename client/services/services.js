angular.module('myApp.services', [])

.factory('ImageFactory', function($http) {
  var data = '';

  var getImage = function() {
    return data;
  }

  //Unnecessary for now
  var saveImage = function(image) {
    data = image;
    console.log(data);
  }

  return {
    getImage: getImage,
    saveImage: saveImage
  }

});