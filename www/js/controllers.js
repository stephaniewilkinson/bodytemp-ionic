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
      Auth.$authWithOAuthPopup("google", function(error, authData){
        if (error){
          Auth.$authWithOAuthRedirect("google", function(error){
            console.log("couldn't log the user in with either method")
          })
        } else if (authData){
          console.log('users successfully logged in')
        }
      })
    }

    $scope.users = Users.users;
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        //if they are a new user, add them to the DB
        console.log("Logged in as", authData);
        console.log("users array", Users)
        Users.$add({
          "name": authData.google.displayName,
          "firstName": authData.google.cachedUserProfile.given_name,
          "gender": authData.google.cachedUserProfile.gender,
          "googleUID": authData.uid,
          "picture": authData.google.cachedUserProfile.picture,
        });
      }
    });

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
    // $scope.chats = Users.all();
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
