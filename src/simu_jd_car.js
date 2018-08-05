"use strict";

// Set z0 as all start point, z1 to z42 are all bot_sites
// distanceOfZ stores all distance between z? to z?
// distanceOfZ using index of sequenceID (not same as siteID)
// Assumption:
//      1. The counts of Poppetry is sufficient （Random Generate 500 every round)
//      2. Pickup Random 6 from these 500 Poppetry as one group.
//      3. Query the route and chose the delivery sequence
//      4. The average speed is 6km/h = 1.67 m/s
//      5. Full load with 6 when setoff from z0
//      6. Each stop cost 0-1200s by Random

const logger = require("./logging_setup");
// TODO: make data into different/separate logfile.
// const logfile = '../log/simu_jd_car_output.log';

const z = require('./data_parser');
const distanceOfZ = require('./z_distance');

const Graph = require('node-dijkstra');
const route = new Graph();

setTimeout(function(){
    if (z.length > 0) {
        // Check data of z and distanceOfZ
        for (var i = 0; i < distanceOfZ.length; i++) {
            for (var j = 0; j< distanceOfZ[i].length; j++) {
                if (distanceOfZ[i][j] != undefined) {
                    // console.log("i = ",i,"j = ",j,distanceOfZ[i][j]);
                    logger.info("distanceOfZ[",i,"][",j,"] = distance between ",z[i][0].slice(-2),z[i][2]," and ",z[j][0].slice(-2),z[j][2]," = ",distanceOfZ[i][j],"meters.");
                };
            };
        }
        // Random 500 sites as delivery target of poppetry
        // Static the Random result in staticOfPopp
        // poppZ used for store the random z list (target address list)
        var countPopp = 500;
        var poppZ = new Array();
        var staticOfPopp = new Array();
        for (var i=1; i<z.length; i++) {
            staticOfPopp[i] = 0;
        }
        for (var i=0; i<countPopp; i++) {
            poppZ[i] = Math.floor( Math.random() * (z.length -1) + 1);
            staticOfPopp[poppZ[i]]++;
        }
        // Random (JDcar * SlotSetting) sequence as target delivery list from the 500
        // chosenID is an array，randomNum is a random number.
        var availableJDCar = 1;
        var availableSlotCountInJDCar = 6;
        var chosenCount = availableJDCar * availableSlotCountInJDCar;
        var chosenID = new Array();
        while (chosenID.length<chosenCount) {  // use predefined number to control the "while"
            var randomNum=Math.floor(Math.random()*(countPopp - 1)); // get a number of 0-499
            if (chosenID.indexOf(randomNum) < 0){
                // Check if the randomNum already exist in the array
                // push the randomNum into the array
                chosenID.push(randomNum);
                // console.log(poppZ[randomNum]);
            }
        }
        // console.log(chosenID);
        // Transform the chosenID to Site sequenceID
        // Put Site sequenceID into each cargoJD. (6 poppZ over 6 cargoJD)
        // i means JD car sequenceID, j means poppZ sequenceID in JD_car_i (both are 0~5)
        var cargoJD = new Array();
        var staticOfChosenPoppZ = new Array();
        for (var i=1; i<z.length; i++) {
            staticOfChosenPoppZ[i] = 0;
        }
        for (i=0; i<availableJDCar; i++) {
            cargoJD[i] = [];
            for (j=0; j<availableSlotCountInJDCar; j++) {
                cargoJD[i][j] = poppZ[chosenID[i * availableJDCar + j]];
                staticOfChosenPoppZ[cargoJD[i][j]]++;
            }
        }
        console.log(cargoJD);
        // TODO: (not determined)
        //      There would be duplicated cargoJD[i][j].  (cross car range)
        //      It mean these same destination Z (popptry) 
        //          could be in one JDCar to improve the delivery efficiency.
        //      I need to re-arrange the i and j to get same Z with same JD_car
        //  Another consideration is we should not re-arrange 
        //      because it is not easy to operate by human beings to do the selection again.

        // console.log(poppZ);
        // console.log(staticOfChosenPoppZ);

        // TODO:
        //      Add weight right with Z's population for random possibility
        
        // Use Dijkstra to find the route
        // step 1: check if there are same destination Z in one JD_Car (one car range)
        setTimeout(function() {
            var routePoints = new Array();
            for (i=0; i<availableJDCar; i++) {
                routePoints[i] = [];
                routePoints[i].push(0); 
                for (j=0; j<availableSlotCountInJDCar; j++) {
                    if (routePoints[i].indexOf(cargoJD[i][j]) < 0){
                        routePoints[i].push(cargoJD[i][j]);
                        // console.log(cargoJD[i][j]);
                    }
                }
                routePoints[i].push(0);
            }
            console.log(routePoints);
            // step 2 find route with routePoints
            var routeWay = new Array();
            var routeTotalDistance = new Array();

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
              
              
        }, 1000) // use 1000 make sure the chosenID and loading the car was done their job.
    }
    else console.log("MongoDB connection timeout.");  
}, 6000) // use 6000 make sure the parser and distance_calculator done their job.
