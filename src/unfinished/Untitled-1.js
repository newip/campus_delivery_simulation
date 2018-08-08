// 有这么几个变量：

// a 其值可能为 0、1
// b 其值可能为 3、4、5
// c 其值可能为 6、7
// 实现一个函数 getArranging 可以返回它们的可能值的排列组合二维数组：


var a = [0, 1];
var b = [3, 4, 5];
var c = [6, 7];

var ret = getArranging( a, b, c );
// ret 值为：
/**
[ [0,3,6], [0,3,7], [0,4,6], [0,4,7], [0,5,6], [0,5,7], [1,3,6], [1,3,7], [1,4,6], [1,4,7], [1,5,6], [1,5,7] ]
**/

function cartesian (...lists) {
  return lists
    .map(list => list.map(item => [item]))
    .reduce((listsA, listsB) =>
      listsA.reduce((list, listA) =>
        list.concat(
          listsB.map(listB => listA.concat(listB))
        ), []
      )
    )
}



var routeWay = new Array();
var routeTotalDistance = new Array();
var k = 0; // k means the routeWay counts (how many routeWays to delivery from z0 - sites - z0)
for (var i=0; i<availableJDCar; i++) { // JD_Car SequenceID i:
    routeWay[i] = [];
    routeTotalDistance[i] = [];
    routeTotalDistance[i][k] = 0;
    for (var a=0; a<routePoints[i].length; a++) {
        routeWay[i][k].push(0);
        routeWay[i][k].push(routePoints[i][a]);
        routeTotalDistance[i][k] = distanceOfZ[0][routePoints[i][a]]; // Initial car i routeWay k total distance.
        for (var b = 0; a<routePoints[i].length; b++) {
            while ( b != a ) {
                // routeWay[i][k+1] = routeWay[i][k+1].concat(routeWay[i][k]);
                // routeTotalDistance[i][k+1] = routeTotalDistance[i][k];
                routeWay[i][k].push(routePoints[i][b]);
                routeTotalDistance[i][k] = distanceOfZ[routePoints[i][a]][routePoints[i][b]] + routeTotalDistance[i][k];
                for (var c = b + 1; c<routePoints[i].length; c++) {
                    routeWay[i][k].push(routePoints[i][c]);
                    routeTotalDistance[i][k] = distanceOfZ[routePoints[i][b]][routePoints[i][c]] + routeTotalDistance[i][k];
                    for (var d = c + 1; d<routePoints[i].length; d++) {
                        routeWay[i][k].push(routePoints[i][d]);
                        routeTotalDistance[i][k] = distanceOfZ[routePoints[i][c]][routePoints[i][d]] + routeTotalDistance[i][k];
                        routeWay[i][k+1].concat(routeWay[i][k]);
                        for (var e = d + 1; e<routePoints[i].length; e++) {
                            routeWay[i][k].push(routePoints[i][e]);
                            routeTotalDistance[i][k] = distanceOfZ[routePoints[i][d]][routePoints[i][e]] + routeTotalDistance[i][k];
                            for (var f = 0; f<routePoints[i].length; f++) {
                                routeWay[i][k].push(routePoints[i][f]);
                                routeTotalDistance[i][k] = distanceOfZ[routePoints[i][e]][routePoints[i][f]] + routeTotalDistance[i][k];
                                routeWay[i][k].push(0);
                                routeTotalDistance[i][k] = distanceOfZ[routePoints[i][f]][routePoints[i][0]] + routeTotalDistance[i][k];
                            }
                            k++;
                            routeTotalDistance[i][k] = 0;
                            routeTotalDistance[i][k] = distanceOfZ[0][routePoints[i][j]]; // Initial car i routeWay k total 
                        }
                        k++;
                        routeWay[i][k].push(0);
                        routeWay[i][k].push(routePoints[i][a]);
                        routeTotalDistance[i][k] = 0;
                        routeTotalDistance[i][k] = distanceOfZ[0][routePoints[i][j]]; // Initial car i routeWay k total 
                    }
                    k++;
                    routeWay[i][k].push(0);
                    routeWay[i][k].push(routePoints[i][a]);
                    routeTotalDistance[i][k] = 0;
                    routeTotalDistance[i][k] = distanceOfZ[0][routePoints[i][j]]; // Initial car i routeWay k total 
                }
            }
            k++;
            routeWay[i][k].push(0);
            routeWay[i][k].push(routePoints[i][a]);
            routeTotalDistance[i][k] = 0;
            routeTotalDistance[i][k] = distanceOfZ[0][routePoints[i][j]]; // Initial car i routeWay k total distance.
        }
    }
}


const Graph = require('node-dijkstra')
 
const route = new Graph()
 
route.addNode('A', { B:1 })
route.addNode('B', { A:1, C:2, D: 4 })
route.addNode('C', { B:2, D:1 })
route.addNode('D', { C:1, B:4 })
 
route.path('A', 'D') // => [ 'A', 'B', 'C', 'D' ]











var Node = function(value){
    var node = {};
    node.value = value;
    node.next = null;
    return node;
  };
  
var LinkedList = function(){
    var list = {};
    list.head = null;
    list.tail = null;
    var listItems = {};
    list.listItems = listItems;
    var itemCount = 0;
    list.addToTail = function(value){
        var newNode = new Node();
        newNode.value = value;
        listItems[itemCount] = newNode;
        list.tail = newNode;
      // for adding first Node
        if(list.head == null){
            list.head = newNode;
        } else {
            listItems[itemCount-1].next = itemCount;
        }
        itemCount++;
    };
    list.removeHead = function(){
      delete listItems[0];
      for(var i = 0; i < itemCount; i++){
        if(i == itemCount - 1){
          break;
        } else {
          listItems[i] = listItems[i+1];
          if(listItems[i].next !== null){
            listItems[i].next -= 1;
          }
          delete listItems[i+1];
        }
      }
      itemCount--;
      list.head = listItems[0];
      list.tail = listItems[itemCount-1];
    };
    list.contains = function(target){
      for(var i = 0; i < itemCount; i++){
        // if target string is equal to value property of a Node
        if(listItems[i].value === target){
          return true;
        }
      }
      return false;
    };
    return list;
  };
  
  for (i=0; i<availableJDCar; i++) {
    var data = cargoJD[i];
    var listData = Object.keys(data).map(function(key){
        return {label: key, value: data[key]};
    });
    listAll(listData, "");
}

function listAll(data, prefix) {
    console.log(prefix);
    for (i=0; i<data.length; i++) {
        var temp = new LinkedList(data);
        var tempString = prefix + temp.removeHead(i);
        listAll(temp,tempString);
    }
}

  // Tests
  // ======
  var myList = new LinkedList();
  myList.addToTail('item one');
  
  myList.removeHead();
  myList.addToTail('item two');
  myList.addToTail('item three');
  myList.addToTail('item four');
  
  console.log(myList);
