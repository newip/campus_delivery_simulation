arr = [
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38]
]

var results = new Array();
var result = new Array();
var routeWayID = 0;

function doExchange(arr, index) {
    for (var i = 0; i<arr[index].length; i++) {
        result[index] = arr[index][i];
        if (index != arr.length - 1) {
            doExchange(arr, index + 1)
        } else {
            results.push(result.join(','))
        }
    }
}

function isRepeat(arr) {
  var hash = {};
  for (var i in arr) {
      if (hash[arr[i]]){
          return true; 
      }
      hash[arr[i]] = true;
  }
  return false;
}

doExchange(arr, 0);

var abc = new Array();
var routeWay = new Array();
for (i=0; i<results.length; i++) {
    abc[i] = results[i].split(",");
    if (isRepeat(abc[i]))
        continue;
    else {
        routeWay[routeWayID] = [];
        routeWay[routeWayID++].push(abc[i]);
    }
}
console.log(routeWay, routeWay.length)


// console.log(results, results.length);//

