angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$state) {
  $scope.answer = 0;

  $scope.erase = function() {
    $scope.answer = 0;
  };

  var tempInput;
  var calculationType = {};
  var isInputed;
  var answered;

  $scope.input = function(input) {

    if($scope.answer === 0) {
      $scope.answer = input;
    } else if ($scope.answer > 100000000) {
      // do nothing
      console.log('hello');
    } else if (isInputed === true) {
      $scope.answer = input;
      isInputed = false;
    } else if (answered === true) {
        $scope.answer = input;
        answered = false;
    } else {
      console.log('voeg toe');
      $scope.answer = $scope.answer*10 + input;
    };

    // Calculations
    // Add
    $scope.add = function() {
      calculationType = "add";
      tempInput = $scope.answer;
      isInputed = true;
      console.log($scope.answer);
      // $scope.answer = 0;
      console.log(tempInput);
    };

    $scope.percentage = function() {
      if($scope.answer === 3388) {
        $state.go('tab.chats');
      }
    }

    $scope.outcome = function() {
      console.log(calculationType);
      if (calculationType === "add") {
        console.log(tempInput);
        console.log($scope.answer);
        $scope.answer = $scope.answer + tempInput;
        answered = true;
      }
    };

  };




})

.controller('ChatsCtrl', function($scope,$state) {

  $scope.goBack = function() {
    $state.go('tab.dash');
  };

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope.chats = Chats.all();
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
