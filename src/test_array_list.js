arr = [
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38],
  [11, 32, 7, 25, 29, 38]
]
results = [];
result = [];
doExchange(arr, 0);

function doExchange(arr, index){
  for (var i = 0; i<arr[index].length; i++) {
      result[index] = arr[index][i];
      if (index != arr.length - 1) {
          doExchange(arr, index + 1)
      } else {
          results.push(result.join(','))
      }
  }
}

console.log(results, results.length);//
