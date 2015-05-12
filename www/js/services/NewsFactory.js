angular.module('urbanet.app.service', [])

.service('FreshlyPressed', function($http, $q) {
  return {

    getBlogs: function($scope) {
      var posts = [];
      $http.get('http://urbanetradio.com/wp-json/posts')
        .success(function(result) {
          $scope.posts = result;
        })
    },

    getPostById: function(postId) {
      var url ='http://urbanetradio.com/wp-json/posts/'+ postId;
      return $http.get(url);
    }

  }

});
