angular.module('starter.services', [])

.factory('Users', function($firebaseArray) {
  var usersRef = new Firebase("https://bodytemp.firebaseio.com/users");
  return $firebaseArray(usersRef);
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

.factory('Logs', function($firebaseArray) {
  // Might use a resource here that returns a JSON array
  // var logsRef = new Firebase("https://bodytemp.firebaseio.com/logs");

  // Some fake testing data
  var logs = [{
    temp: 98.2,
    time: new Date().toDateString(),
  }, {
    temp: 97.1,
    time: new Date().toDateString(),
  }, {
    temp: 97.5,
    time: new Date().toDateString(),
  }, {
    temp: 97.3,
    time: new Date().toDateString(),
  }, {
    temp: 96.9,
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
