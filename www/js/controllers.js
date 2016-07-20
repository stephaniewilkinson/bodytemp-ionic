angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Logs) {
  $scope.$on('$ionicView.enter', function(e) {
  });
  $scope.logs = Logs.all();
  $scope.remove = function(log){
    Logs.remove(log);
  };
  $scope.addLog = function() {
    $scope.logs.push({temp: $scope.temp, time: $scope.time.toString()});
  };
})

.controller('UsersCtrl', function($scope, Auth, Users){
    $scope.$on('$ionicView.enter', function(e) {
    });

    $scope.login = function() {
      Auth.$authWithOAuthRedirect("google");
    }

    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        console.log("Logged in as", authData);
      }
      $scope.authData = authData; // This will display the user's name in our view
    });

    $scope.users = Users.users;
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
