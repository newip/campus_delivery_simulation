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
//      6. Each stop cost 0-900 by Random

const logger = require("./logging_setup");
// TODO: make data into different/separate logfile.
// const logfile = '../log/simu_jd_car_output.log';

const z = require('./data_parser');
const distanceOfZ = require('./z_distance');

const JDCARCOUNT = 6;
const JDCARSLOTS = 6;
const JDCARSPEED = 1.67; // 1.67 m/s = 6 km/h
const XBCARSPEED = 1.67; // 1.67 m/s = 6 km/h
const MAXSTOPTIME = 900; //1200 s = 20 minutes

setTimeout(function(){
    if (z.length > 0) {
        // Check data of z and distanceOfZ
        for (var zi = 0; zi < distanceOfZ.length; zi++) {
            for (var zj = 0; zj< distanceOfZ[zi].length; zj++) {
                if (distanceOfZ[zi][zj] != undefined) {
                    // console.log("zi = ",zi,"zj = ",zj,distanceOfZ[zi][zj]);
                    logger.info("distanceOfZ[",zi,"][",zj,"] = distance between ",z[zi][0].slice(-2),z[zi][2]," and ",z[zj][0].slice(-2),z[zj][2]," = ",distanceOfZ[zi][zj],"meters.");
                };
            };
        }
        // Random 500 sites as delivery target of poppetry
        // Static the Random result in staticOfPopp
        // poppZ used for store the random z list (target address list)
        var countPopp = 500;
        var poppZ = new Array();
        var staticOfPopp = new Array();
        for (var si=1; si<z.length; si++) {
            staticOfPopp[si] = 0;
        }
        for (var si=0; si<countPopp; si++) {
            poppZ[si] = Math.floor( Math.random() * (z.length -1) + 1);
            staticOfPopp[poppZ[si]]++;
        }
        // Random (JDcar * SlotSetting) sequence as target delivery list from the 500
        // chosenID is an array，randomNum is a random number.
        var availableJDCar = JDCARCOUNT;
        var availableSlotCountInJDCar = JDCARSLOTS;
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
        for (var si=1; si<z.length; si++) {
            staticOfChosenPoppZ[si] = 0;
        }
        for (var si=0; si<availableJDCar; si++) {
            cargoJD[si] = [];
            for (var sj=0; sj<availableSlotCountInJDCar; sj++) {
                cargoJD[si][sj] = poppZ[chosenID[si * availableJDCar + sj]];
                staticOfChosenPoppZ[cargoJD[si][sj]]++;
            }
        }
        console.log("Target cargo / poppetrys: \n", cargoJD);

        String.prototype.toHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;
        }

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
        
        // step 1: check if there are same destination Z in one JD_Car (one car range)
        setTimeout(function() {
            var routePoints = new Array();
            for (var ssi=0; ssi<availableJDCar; ssi++) {
                routePoints[ssi] = [];
                // routePoints[ssi].push(0); 
                for (var ssj=0; ssj<availableSlotCountInJDCar; ssj++) {
                    if (routePoints[ssi].indexOf(cargoJD[ssi][ssj]) < 0){
                        routePoints[ssi].push(cargoJD[ssi][ssj]);
                        // console.log(cargoJD[ssi][ssj]);
                    }
                }
                // routePoints[ssi].push(0);
            }
            // console.log("routePoints: ",routePoints);
            
            var routeWay = new Array();
            var routeTotalDistance = new Array();
            var arr = new Array();
            var results = new Array();
            var result =new Array();
            var tempArray = new Array();
            var routeWayID = 0;
            var minDistance = new Array();
            var minDistanceIndex = new Array();
            var bestRouteWay = new Array();
            var waitingJDTime = new Array();
            var deliveryJDTime = new Array();

            for (var i=0; i<availableJDCar; i++) {
        // step 2: get all possible compose of destinations with fully duplication
                arr[i] = new Array();
                // var routeWay[carloop] = new Array();
                // var routeTotalDistance[carloop] = new Array();
                for (var j=0; j<routePoints[i].length; j++) {
                    arr[i][j]=routePoints[i];
                    // console.log(i,j,arr[i]);
                }
                // console.log("arr: No. ",i," : \n", arr[i]);
                  
                results[i] = [];
                result[i] = [];

                function doExchange(arr_pa, index) {
                    for (var k = 0; k<arr_pa[index].length; k++) {
                        result[i][index] = arr_pa[index][k];
                        if (index != arr_pa.length - 1) {
                            doExchange(arr_pa, index + 1)
                        } else {
                            results[i].push(result[i].join(','))
                        }
                    }
                }
                doExchange(arr[i], 0);
                // console.log(results[i],results[i].length);

                function isRepeat(arr_pa) {
                    var hash = {};
                    for (var k in arr_pa) {
                        if (hash[arr_pa[k]]){
                            return true; 
                        }
                        hash[arr_pa[k]] = true;
                    }
                    return false;
                }
                
        // step 3: Remove the rows with duplicated z. Get all real available routeWay
                // Make results with 720 lines for 6 elements, 120 lines for 5 elements
                tempArray[i] = [];
                routeWay[i] = [];
                routeWayID = 0;

                for (var j=0; j<results[i].length; j++) {
                    tempArray[i][j] = results[i][j].split(",");
                    if (isRepeat(tempArray[i][j]))
                        continue;
                    else {
                        // routeWay[i][routeWayID] = [];
                        // console.log(routeWayID,routeWay,tempArray[i][j]);
                        routeWay[i][routeWayID++]=tempArray[i][j];
                    }
                }


        // step 4: Calculate the distance to get the best way (shortest route)
                // Handle the results array with start point 0 and end point 0
                for (var j=0; j<routeWay[i].length; j++) {
                    for (var k=routeWay[i][j].length; k>0; k--) {
                        routeWay[i][j][k] = routeWay[i][j][k-1];
                    }
                    routeWay[i][j][0] = 0;
                    routeWay[i][j][routeWay[i][j].length] = 0;
                }
                
                // console.log(routeWay[i], routeWay[i].length)

                // Calculate the distance for all the possible route.
                routeTotalDistance[i] = [];
                for (var ssj=0; ssj<routeWay[i].length; ssj++) {  // j here means sequenceID of routeWay
                    routeTotalDistance[i][ssj] = 0;
                    for (var ssk=0; ssk<(routeWay[i][ssj].length - 1); ssk++) {
                        // console.log(routeWay[i][ssj][ssk],routeWay[i][ssj][ssk+1]);
                        // routeTotalDistance[i][ssj] = distanceOfZ[Number(routeWay[i][ssj][ssk])][Number(routeWay[i][ssj][ssk+1])] + routeTotalDistance[i][ssj];
                        routeTotalDistance[i][ssj] = Math.round((distanceOfZ[routeWay[i][ssj][ssk]][routeWay[i][ssj][ssk+1]] + routeTotalDistance[i][ssj]) * 1000 ) / 1000;
                    }
                }

                // Pick up the best way (shortest distance between start and end.)
                // for (var ssj=0; ssj<routeTotalDistance.leng)
                // console.log(routeTotalDistance[i]);

                minDistance[i] = Math.min.apply(null, routeTotalDistance[i]);
                minDistanceIndex[i] = routeTotalDistance[i].indexOf(minDistance[i]);
                bestRouteWay[i] = routeWay[i][minDistanceIndex[i]];

                console.log("cargoJD : %o", i, "Best Route is :", bestRouteWay[i]);
                console.log("Total Distance: %o", Math.round(minDistance[i]), "meters.");

                // verify if the shortest route distance total as same as the min value of routeTotalDistance
                // var abcd = 0;
                // for (var ssk=0; ssk<(routeWay[i][minDistanceIndex[i]].length - 1); ssk++) {
                //     abcd = Math.round((distanceOfZ[routeWay[i][minDistanceIndex[i]][ssk]][routeWay[i][minDistanceIndex[i]][ssk+1]] + abcd) * 1000 ) / 1000;
                // }
                // console.log(abcd);

                waitingJDTime[i] = Math.round(routePoints[i].length * (Math.random() * MAXSTOPTIME + 30));
                deliveryJDTime[i] = Math.round(minDistance[i] / JDCARSPEED + waitingJDTime[i]);
                
                // console.log("cargoJD : %o", i);
                console.log('The JD car active running time is : %o', Math.round(minDistance[i] / JDCARSPEED / 60), 'minutes.');
                console.log('The JD car waiting time is : %o', Math.round(waitingJDTime[i] / 60), 'minutes.');
                console.log('The JD car total working time is : %o', deliveryJDTime[i].toString().toHHMMSS());
                console.log('Successfully delivered at %o ', routePoints[i].length, 'site stops and ', cargoJD[i].length,' poppetrys. \n');
                
                
            }

            // calculate total time for all the JDcar finished delivery.
            var sumJDTime = 0;
            var sumJDDistance = 0;
            for (var ssi=0; ssi<availableJDCar; ssi++) {
                sumJDTime += deliveryJDTime[ssi];
                sumJDDistance += minDistance[ssi];
            }
            console.log('JD car totally drived %o', Math.round(sumJDDistance), 'meters to deliver all the', chosenCount, 'poppetry.');
            console.log('JD car average driving distance was %o', Math.round(sumJDDistance / chosenCount), 'meters per poppetry.');
            console.log('JD car totally consumed %o', sumJDTime.toString().toHHMMSS(), 'to deliver all the', chosenCount, 'poppetry.');
            console.log('JD car average delivery time was %o', Math.round(sumJDTime / chosenCount).toString().toHHMMSS(), 'per poppetry.');

        }, 1000) // use 1000 make sure the chosenID and loading the car was done their job.

        // Start Handle with XinBot with same cargoJD (not chosenID) data.
        var cargoXB = [].concat.apply([],cargoJD);
        var sumXBDistance = 0;
        var waitingXBTime = cargoXB.length * 30; // 30 seconds for each site stop.
        for (var si=0; si<cargoXB.length; si++) {
            sumXBDistance += (distanceOfZ[0][cargoXB[si]] * 2);
        }
        var sumXBTime = Math.round(sumXBDistance / XBCARSPEED + waitingXBTime);

        console.log('\nXB bot totally drived %o', Math.round(sumXBDistance), 'meters to deliver all the', chosenCount, 'poppetry.');
        console.log('XB bot average driving distance was %o', Math.round(sumXBDistance / chosenCount), 'meters per poppetry.');
        console.log('XB bot totally consumed %o', sumXBTime.toString().toHHMMSS(), 'to deliver all the', chosenCount, 'poppetry.');
        console.log('XB bot average delivery time was %o', Math.round(sumXBTime / chosenCount).toString().toHHMMSS(), 'per poppetry.\n');


    }
    else 
        throw new Error('MongoDB connection timeout.');  
}, 6000) // use 6000 make sure the parser and distance_calculator done their job.

// car by car: cargoJD --> routePoints --> (results for temp) --> routeWay --> bestRouteWay 
