function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            log('call resolve()...');
            resolve('200 OK');
        }
        else {
            log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}





// js数组排列组合(收录一种简单的方法)
// 链接：https://www.jianshu.com/p/b6e31d6139cc

arr = [
    ['a', 'b'],
    ['1', '2', '3'],
    ['x', 'y'],
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

console.log( results);//
