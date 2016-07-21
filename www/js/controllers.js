angular.module('starter.controllers', [])

.controller('LogsCtrl', function($scope, Firebase, Logs, Users, UserRef, Chart) {
  var ref = new Firebase("https://bodytemp.firebaseio.com");
  var authData = ref.getAuth();
  if (authData) {
    console.log("Authenticated user with uid:", authData.uid);
  }
  $scope.logTemps = Logs.temp();
  $scope.logDays = Logs.date();
  $scope.$on('$ionicView.beforeEnter', function(e) {
    var ctx = document.getElementById("myChart");
    Chart(ctx, $scope.logTemps, $scope.logDays);
  });
  $scope.remove = function(log){
    Logs.remove(log);
  };
  $scope.addLog = function() {
    $scope.logs.push({temp: $scope.temp, time: $scope.time.toString()});
  };
})

.controller('UsersCtrl', function($scope, Auth, Users, UserRef){
  UserRef.set({
    alanisawesome: {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
    gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
    });

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
      } else {
        console.log('this user is currently signed in');
        //if they are a new user, add them to the DB
        console.log("Logged in as", authData);
        var uid = authData.uid.toString();
        console.log("users array", Users);
        UserRef.child(uid).set({
          "name": authData.google.displayName,
          "firstName": authData.google.cachedUserProfile.given_name,
          // "gender": authData.google.cachedUserProfile.gender,
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
  Logs.all().map(function(el, i, array){
    el.title = el.temp;
    el.startTime = el.time;
    el.endTime = el.time + 1;
    el.allDay = false;
    delete el.temp;
  });
  $scope.eventSource = Logs.all()
})
