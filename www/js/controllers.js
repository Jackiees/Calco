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
      if($scope.answer === 8) {
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

.controller('ChatsCtrl', function($scope,$state,$ionicModal,$ionicSlideBoxDelegate, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {

  // $ionicPlatform.ready(function() {
  $scope.images = FileService.images();
    // $scope.$apply();
  // });

  // $scope.image1 = $scope.images[0];

  $scope.urlForImage = function(imageName) {
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  }

  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Photo from library' }
      ],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  }

  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.handleMediaDialog(type).then(function() {
      $scope.$apply();
    });
  }

  $scope.aImages = [{
      	'src' : 'img/jane.jpg',
      	'msg' : 'Swipe me to the left. Tap/click to close'
    	}, {
        'src' : 'img/chloe.jpg',
        'msg' : ''
      }, {
        'src' : 'img/mary.jpg',
        'msg' : ''
      }, {
        'src' : 'img/denise.jpg',
        'msg' : ''
      }, {
        'src' : 'img/doutzen.jpg',
        'msg' : ''
      }, {
        'src' : 'img/suzy.jpg',
        'msg' : ''
      }, {
        'src' : 'img/mary.jpg',
        'msg' : ''
      }
  ];

    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

  	$scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };


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
