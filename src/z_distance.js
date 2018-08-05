"use strict";

var z = require('./data_parser');

// R is Earth Mean Radius, by meters or 6378137
var R = 6371008.8;
var theCapmusLatRef = 39.96; // BUPT campus
var rlat = theCapmusLatRef * Math.PI / 180; // rlat = reference latitude in radians

var distanceOfZ = new Array();

// meters per degree latitude: 
// var metersLatPerDegree = 111132.92 - 559.82 * Math.cos(2 * rlat) + 1.175 * Math.cos(4 * rlat);
var metersLatPerDegree = 111131.77741377673104 / (1 + 0.0033584313098335197297 * Math.cos(2 * rlat))^(3/2); 
// meters per degree longitude: 
// var metersLonPerDegree = 111412.84 * Math.cos(rlat) - 93.5 * Math.cos(3 * rlat)
var metersLonPerDegree = 111506.26354049367285 * Math.cos(rlat) / (1 + 0.0033584313098335197297 * Math.cos(2 * rlat))^(1/2); 

// Calculate the distance. (Only for Sample.)
// distance of longitude diff = (R * cosine latitude) * (longitude 2 - longitude 1)
// distance of latitude diff = 111.19*(latitude1 - latitude2)
// console.log((476.35013937950134-476.34934008121485)*metersLonPerDegree);
// console.log(Math.abs(39.96038726028536-39.96054761895643)*metersLatPerDegree);

setTimeout(function(){
    if (z.length > 0) {
        console.log("MongoDB query success. XinBox Sites total:",z.length);
        for (var i = 0; i < (z.length - 1); i++) {
            distanceOfZ[i] = [];
            // distanceOfZ[i][i] = 0;
            for (var j = i + 1; j < z.length; j++) {
                distanceOfZ[i][j] = Math.round(((Math.abs(z[i][3]-z[j][3]) * metersLonPerDegree ) + (Math.abs(z[i][4]-z[j][4]) * metersLatPerDegree )) * 1000) / 1000;
                // distanceOfZ[j][i] = distanceOfZ[i][j];
                // console.log("distanceOfZ[",i,"][",j,"] = distance between ",z[i][0].slice(-2),z[i][2]," and ",z[j][0].slice(-2),z[j][2]," = ",distanceOfZ[i][j],"meters.");
            }
            // console.log("only i =",i,distanceOfZ.length);
        }
        // distanceOfZ[j][j] = 0;
        // console.log(z);
    }
    else console.log("MongoDB connection timeout.");  
}, 5000);

// console.log(distanceOfZ)
// for (var i = 0; i < distanceOfZ.length; i++)
module.exports = distanceOfZ;
