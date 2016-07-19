angular.module('starter.services', [])

.factory('Users', function($firebaseArray) {
  var usersRef = new Firebase("https://bodytemp.firebaseio.com/users");
  // Might use a resource here that returns a JSON array

  var usersFb = $firebaseArray(usersRef);

  return {
    all: function() {
      return users;
    },
    remove: function(chat) {
      users.splice(users.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(chatId)) {
          return users[i];
        }
      }
      return null;
    },
    users: usersFb
  };
})

.factory('Logs', function($firebaseArray) {
  // Might use a resource here that returns a JSON array
  // var logsRef = new Firebase("https://bodytemp.firebaseio.com/logs");

  // Some fake testing data
  var logs = [{
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
