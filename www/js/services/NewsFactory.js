angular.module('urbanet.app.service', [])

.service('FreshlyPressed', function($http, $q, $ionicLoading) {
  return {

    getBlogs: function($scope) {

      var defer = $q.defer();

      $ionicLoading.show({
        template: 'Cargando Noticias...<br>'+
                  '<ion-spinner class="spinner-energized"'+
                  'icon="android"></ion-spinner>'
      });

      $scope.postsURL = 'http://urbanetradio.com/wp-json/posts?filter[posts_per_page]=25&_jsonp=JSON_CALLBACK';
      $http.jsonp($scope.postsURL).success(function(data, status, headers, config) {
        $scope.posts = data;
        defer.resolve($scope.posts);
        $ionicLoading.hide();
      })
      .error(function(data, err) {
        $ionicLoading.hide();
        console.log(err);
        defer.reject(err);
      });
      return defer.promise;
    },

    getPostById: function(postId) {
      var url ='http://urbanetradio.com/wp-json/posts/'+ postId +'?_jsonp=JSON_CALLBACK';
      return $http.jsonp(url);
    }
  }

});
