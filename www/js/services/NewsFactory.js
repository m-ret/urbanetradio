angular.module('urbanet.app.service', [])

.service('FreshlyPressed', function($http, $q, $ionicLoading) {
  return {

    getBlogs: function() {
      return $http.jsonp('http://urbanetradio.com/wp-json/posts?_jsonp=JSON_CALLBACK');
    },

    getPostById: function(postId) {
      var url ='http://urbanetradio.com/wp-json/posts/'+ postId +'?_jsonp=JSON_CALLBACK';
      return $http.jsonp(url);
    }
  }

});
