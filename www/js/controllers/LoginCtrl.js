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
    console.log("Create User Function called");
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
          console.log('everything workin great with popup');
        }).catch(function (error) {
          alert("Error: " + error);
          $ionicLoading.hide();
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
        template: 'Ingresando...<br>'+
                  '<ion-spinner class="spinner-assertive"'+
                  'icon="android"></ion-spinner>',
        duration: 1000
      });
      auth.$authWithPassword({
        email: user.email,
        password: user.pwdForLogin
      }).then(function (authData) {
        console.log("Logged in as:" + authData.password.email);
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
        $ionicPopup.alert({
          title: 'Error al ingresar',
          template: "Autenticación Fallida" + error.message
        });
        $ionicLoading.hide();
      });
    } else
    $scope.signInErrorShow = true;
    $scope.signInErrorMsg = 'E-mail y Contraseña son requeridos'
  };

  $scope.logOut = function(user) {
    console.log(user);
    ref.unauth();
  };

});
