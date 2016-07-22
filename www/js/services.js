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
  var calendarArray = logsArray;
  var newArray =
  [
    {
      startTime: new Date(Date.UTC(2016, 7, 22)),
      endTime: new Date(Date.UTC(2016, 7, 23)),
      allDay: false,
      title: 'Temperature: 98.13'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 18)),
      endTime: new Date(Date.UTC(2016, 7, 19)),
      allDay: false,
      title: 'Temperature: 97.7'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 16)),
      endTime: new Date(Date.UTC(2016, 7, 17)),
      allDay: false,
      title: 'Temperature: 97.7'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 17)),
      endTime: new Date(Date.UTC(2016, 7, 18)),
      allDay: false,
      title: 'Temperature: 98.3'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 14)),
      endTime: new Date(Date.UTC(2016, 7, 15)),
      allDay: false,
      title: 'Temperature: 97.4'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 13)),
      endTime: new Date(Date.UTC(2016, 7, 14)),
      allDay: false,
      title: 'Temperature: 97.27'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 12)),
      endTime: new Date(Date.UTC(2016, 7, 13)),
      allDay: false,
      title: 'Temperature: 97.09'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 9)),
      endTime: new Date(Date.UTC(2016, 7, 10)),
      allDay: false,
      title: 'Temperature: 96.43'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 5)),
      endTime: new Date(Date.UTC(2016, 7, 6)),
      allDay: false,
      title: 'Temperature: 96.85'
    },
    {
      startTime: new Date(Date.UTC(2016, 7, 1)),
      endTime: new Date(Date.UTC(2016, 7, 2)),
      allDay: false,
      title: 'Temperature: 97.57'
    },
    {
      startTime: new Date(Date.UTC(2016, 6, 30)),
      endTime: new Date(Date.UTC(2016, 7, 1)),
      allDay: false,
      title: 'Temperature: 97.775'
    },
  ];
  // calendarArray.map(function(obj){
  //   {
  //     startTime: new Date(obj.time).toDateString(),
  //     endTime: new Date(obj.time).toDateString(),
  //     allDay: false
  //     title: obj.temp,
  //   }
  // }

  logsArray.$loaded().then(function() {
    deferred.resolve();
  });

  logsArray.$watch(function(evt) {
    $rootScope.$broadcast('LOGS_CHANGED');
  });

  return {
    calendar: function(){
      return newArray;
    },
    all: function(){
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
