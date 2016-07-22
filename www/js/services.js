angular.module('starter.services', [])

.factory('Users', function($firebaseArray) {
  var usersRef = new Firebase("https://bodytemp.firebaseio.com/users");
  return $firebaseArray(usersRef);
})

.factory('Firebase', function() {
  var ref = new Firebase("https://bodytemp.firebaseio.com");
  return ref;
})

.factory('Chart', function(){
  var chartMaker = {};
  var buildChart = function(ctx, dataSet, labels){
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: dataSet,
                lineTension: 0.4,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:false
                    }
                }]
            }
          }
      })
  };
  return buildChart;
})

.factory('UserRef', function(){
  var ref = new Firebase("https//bodytemp.firebaseio.com/users");
  return ref;
})

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//bodytemp.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory('Logs', function($firebaseArray, Firebase, $q, $rootScope) {
  var ref = new Firebase("https://bodytemp.firebaseio.com/");
  var authData = ref.getAuth();
  var uid = authData.uid;
  console.log(uid);

  var deferred = $q.defer();

  var logData = new Firebase(`https://bodytemp.firebaseio.com/users/${uid}/logs`);
  var sortedLogs = logData.orderByChild('time');
  var logsArray = $firebaseArray(sortedLogs);

  logsArray.$loaded().then(function() {
    deferred.resolve();
  });

  logsArray.$watch(function(evt) {
    $rootScope.$broadcast('LOGS_CHANGED');
  });

  return {
    calendar: function(){
      console.log(this.all);
      // return [{
      //           startTime: new Date(Date.UTC(2016, 6, 8)),
      //           endTime: new Date(Date.UTC(2016, 6, 9)),
      //           allDay: false
      //         },
      //         {
      //           startTime: new Date(Date.UTC(2016, 6, 8)),
      //           endTime: new Date(Date.UTC(2016, 6, 9)),
      //           allDay: false
      //         },
      //         {
      //           startTime: new Date(Date.UTC(2016, 6, 8)),
      //           endTime: new Date(Date.UTC(2016, 6, 9)),
      //           allDay: false
      //         },
      //       ];
    },
    all: function() {
      return logsArray;
    },
    temp: function(){
      return logsArray.map(function(log){return log.temp});
    },
    date: function(){
      return logsArray.map(function(log){return new Date(log.time).toDateString()});
    },
    remove: function(log) {
      logsArray.$remove(log);
    },
    get: function(logId) {
      for (var i = 0; i < logsArray.length; i++) {
        if (logsArray[i].id === parseInt(logId)) {
          return logs[i];
        }
      }
      return null;
    },
    ready: deferred.promise
  };
});
