angular.module('starter.controllers', [])

.controller('LogsCtrl', function($scope, Firebase, Logs, Users, UserRef, Chart) {

  ////AUTH
  var ref = new Firebase("https://bodytemp.firebaseio.com/");
  var authData = ref.getAuth();
  var uid = authData.uid.toString();

  ////PASS LOG DATA TO CHART
  $scope.logTemps = Logs.temp();
  console.log(Logs.temp());
  $scope.logDays = Logs.date();
  $scope.$on('$ionicView.afterEnter', function(e) {
    var ctx = document.getElementById("myChart");
    Chart(ctx, $scope.logTemps, $scope.logDays);
  });

  ////LOG METHODS
  $scope.logs = Logs.all();
  $scope.remove = function(log){
    Logs.remove(log);
  };
  ////Persist
  var currentUserRef = new Firebase(`https://bodytemp.firebaseio.com/users/${uid}/logs`);
  $scope.addLog = function() {
    currentUserRef.push({
      'temp': $scope.temp,
      'time': $scope.time.toString()
    });
  };

  ////PERSISTING LOGS TO Firebase
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

    ////LOGOUT
    $scope.logout = function(){
      UserRef.unauth();
    }

    ////PERSIST
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        var uid = authData.uid.toString();
        UserRef.child(uid).update({
          "name": authData.google.displayName,
          "firstName": authData.google.cachedUserProfile.given_name,
          // "gender": authData.google.cachedUserProfile.gender,
          "picture": authData.google.cachedUserProfile.picture,
        });
      }
    });
})

.controller('AccountCtrl', function($scope) {
  ////AUTH
  var ref = new Firebase("https://bodytemp.firebaseio.com/");
  var authData = ref.getAuth();
  var uid = authData.uid.toString();
  $scope.settings = {
    name: authData.google.displayName,
    picture: authData.google.profileImageURL,
    pregnancy: true,
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
