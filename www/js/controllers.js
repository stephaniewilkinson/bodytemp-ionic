angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Logs) {
  $scope.$on('$ionicView.enter', function(e) {
  });
  $scope.logs = Logs.all();
  $scope.remove = function(log){
    Logs.remove(log);
  };
  $scope.addLog = function() {
    $scope.logs.push({temp: $scope.temp, time: $scope.time});
  };
})

.controller('UsersCtrl', function($scope, Users){
    $scope.$on('$ionicView.enter', function(e) {
    });

    $scope.users = Users.users;
    console.log('Users array',Users.users);
    $scope.addUser = function(){
      $scope.users.$add({
        "name": $scope.name,
        "email": $scope.email,
        "password": $scope.password,
        "logs": [{
          temp: 97.0,
          time: Date.now(),
        }, {
          temp: 97.1,
          time: Date.now(),
        }, {
          temp: 97.2,
          time: Date.now(),
        }, {
          temp: 97.3,
          time: Date.now(),
        }, {
          temp: 97.4,
          time: Date.now(),
        }]
        });
      }
    $scope.chats = Users.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
})

.controller('ChatsCtrl', function($scope, Users) {
  $scope.$on('$ionicView.enter', function(e) {
  });
  $scope.chats = Users.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    name: "Stephanie Wilkinson",
    enableFriends: true,
    email: "what.happens@gmail.com"
  };
});
