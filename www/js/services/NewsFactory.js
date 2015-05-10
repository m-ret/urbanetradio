angular.module('urbanet.app.service', [])

.service('FreshlyPressed', function($http, $q) {
  return {

    getBlogs: function($scope) {
      var posts = [];
      $http.jsonp('https://public-api.wordpress.com/rest/v1.1/freshly-pressed?callback=JSON_CALLBACK')
        .success(function(result) {
          $scope.posts = result.posts;
        });
    },

    getPostById: function(siteId, postId) {
      var url ='https://public-api.wordpress.com/rest/v1.1/sites/'+siteId+'/posts/'+postId+'?callback=JSON_CALLBACK';
      return $http.jsonp(url);
    }
  }

});
