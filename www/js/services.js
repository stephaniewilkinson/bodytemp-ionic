angular.module('starter.services', [])

.factory('Users', function($firebaseArray) {
  var usersRef = new Firebase("https://bodytemp.firebaseio.com/users");
  // Might use a resource here that returns a JSON array
  return $firebaseArray(usersRef);
})

.factory('UserRef', function(){
  var ref = new Firebase("https//bodytemp.firebaseio.com/users");
  return ref;
})

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//bodytemp.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory('Logs', function($firebaseArray) {
  // Might use a resource here that returns a JSON array
  // var logsRef = new Firebase("https://bodytemp.firebaseio.com/logs");

  // Some fake testing data
  var logs = [{
    temp: 97.0,
    time: new Date().toDateString(),
  }, {
    temp: 97.1,
    time: new Date().toDateString(),
  }, {
    temp: 97.2,
    time: new Date().toDateString(),
  }, {
    temp: 97.3,
    time: new Date().toDateString(),
  }, {
    temp: 97.4,
    time: new Date().toDateString(),
  }];

  return {
    all: function() {
      return logs;
    },
    remove: function(log) {
      logs.splice(logs.indexOf(log), 1);
    },
    get: function(logId) {
      for (var i = 0; i < logs.length; i++) {
        if (logs[i].id === parseInt(logId)) {
          return logs[i];
        }
      }
      return null;
    },
    // logs: $firebaseArray(logsRef)
  };
});
