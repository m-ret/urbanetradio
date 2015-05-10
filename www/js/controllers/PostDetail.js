angular.module('urbanet.app.controllers')

.controller('PostDetailCtrl', function($scope, $stateParams, FreshlyPressed) {
  var postId = $stateParams.postId,
      siteId = $stateParams.siteId;

 FreshlyPressed.getPostById(siteId,postId).success(function(response){
    $scope.post = response
  })

});
