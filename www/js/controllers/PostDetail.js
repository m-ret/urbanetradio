angular.module('urbanet.app.controllers')

.controller('PostDetailCtrl', function($scope, $stateParams, $sce, FreshlyPressed) {

  var postId = $stateParams.postId;

  FreshlyPressed.getPostById(postId).success(function(response){
    $scope.post = response;
  });

  $scope.trustSrc = function(src) {
     return $sce.trustAsHtml(src);
  };

});
