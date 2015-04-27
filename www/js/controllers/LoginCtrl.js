'use strict';

angular.module('urbanet.app.controllers', [])

.controller("LoginCtrl", function($scope, $rootScope, $ionicLoading, $ionicModal,
                                  $timeout, $firebaseAuth, $state, $ionicPopup) {

  var ref = new Firebase('https://urbanetapp.firebaseio.com/'),
      auth = $firebaseAuth(ref);

  $ionicModal.fromTemplateUrl('templates/modal-login.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.signUpErrorShow = false;
  $scope.signInErrorShow = false;

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.createUser = function(user) {
    $ionicLoading.show({
      template: 'Creando cuenta'
    });
    $scope.validationError = false;
    if (user && user.email && user.name ) {
      if (user.password === user.confirm ) {
        auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function (userData) {
          ref.child("users").child(userData.uid).set({
            email: user.email,
            displayName: user.name
          });
          $ionicLoading.hide();
          $ionicPopup.show({
            template: 'Cuenta creada exitosamente',
            scope: $scope,
            buttons: [
              {
                text: 'Aceptar',
                type: 'button-positive',
                onTap: function() {
                  $state.transitionTo('tabs.news');
                }
              }
            ]
          });

          console.log('everything workin great with popup');
        }).catch(function (error) {
            $scope.signUpErrorShow = true;
            $scope.signUpErrorMsg = 'E-mail ya esta registrado ' + error;
            $ionicLoading.hide();
        });
        $ionicLoading.hide();
        console.log('here2');
      }else {
        $ionicLoading.hide();
        $scope.signUpErrorShow = true;
        $scope.signUpErrorMsg = "Error al confirmar contraseña";
      }
    }else {
      $ionicLoading.hide();
      $scope.signUpErrorShow = true;
      $scope.signUpErrorMsg = "Falta espacio requerido";
    }
  };

  $scope.signIn = function (user) {
    $scope.signInErrorShow = false;
    if (user && user.email && user.pwdForLogin) {
      $ionicLoading.show({
        template: 'Ingresando...'
      });
      auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function (authData) {
        console.log("Logged in as:" + authData.uid);
        ref.child("users").child(authData.uid).once('value', function (snapshot) {
          var val = snapshot.val();
          $scope.$apply(function () {
            $rootScope.displayName = val;
          });
        });
        $scope.userLogin = true;
        $ionicLoading.hide();
        $scope.closeModal();
        $rootScope.$broadcast('');
      }).catch(function (error) {
        $scope.signInErrorMsg = error.message;
        $scope.signInErrorShow = true;
        $ionicLoading.hide();
      });
    } else
    $scope.signInErrorShow = true;
    $scope.signInErrorMsg = 'E-mail y Contraseña son requeridos';
  };
});
