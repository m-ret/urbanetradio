angular.module('urbanet.app.service', [])

.service('FreshlyPressed', function($http, $q) {
  return {

    getBlogs: function($scope) {
      $scope.postsURL = 'http://urbanetradio.com/wp-json/posts?filter[posts_per_page]=30&_jsonp=JSON_CALLBACK';
      $http.jsonp($scope.postsURL).success(function(data, status, headers, config) {
        $scope.posts = data;
      }).error(function(data, status_headers, config) {
          console.log('error');
      });
    },

    getPostById: function(postId) {
      var url ='http://urbanetradio.com/wp-json/posts/'+ postId +'?_jsonp=JSON_CALLBACK';
      return $http.jsonp(url);
    }
  }

});
