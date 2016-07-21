angular.module('starter.controllers', [])

.controller('LogsCtrl', function($scope, Logs, Users, UserRef, Chart) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    var ctx = document.getElementById("myChart");
    var labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    var data = [12, 19, 3, 5, 2, 3];
    Chart(ctx, data, labels);
  });
  $scope.logs = Logs.all();
  $scope.remove = function(log){
    Logs.remove(log);
  };
  $scope.addLog = function() {
    $scope.logs.push({temp: $scope.temp, time: $scope.time.toString()});
  };
})

.controller('UsersCtrl', function($scope, Auth, Users, UserRef){
    $scope.$on('$ionicView.enter', function(e) {
    });

    ////LOGIN
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
    var authData = UserRef.getAuth();
    console.log('authdata', authData);
    ////LOGOUT
    $scope.logout = function(){
      UserRef.unauth();
    }

    ////PERSIST
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else if (authData){
        console.log('this user is currently signed in');
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
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    name: "Stephanie Wilkinson",
    enableFriends: true,
    email: "what.happens@gmail.com"
  };
})

.controller('CalCtrl', function($scope, Logs){
  console.log(Logs);
  $scope.calendar = {};
  var events = [];

  var newArray = Logs.map(function(el, i, array){
    el.title = el.temp;
    el.startTime = el.time;
    el.endTime = el.time + 1;
    el.allDay = false;
    delete el.temp;
  });

})
