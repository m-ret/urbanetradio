angular.module('urbanet.app.controllers')

.controller('PostDetailCtrl', function($scope, $stateParams, FreshlyPressed) {

  var postId = $stateParams.postId;

 FreshlyPressed.getPostById(postId).success(function(response){
    $scope.post = response;
  });

});
