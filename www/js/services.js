angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Logs', function() {
  // Might use a resource here that returns a JSON array

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
    }
  };
});
