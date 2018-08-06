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

setTimeout(function() {
    if (z.length > 0) {
        console.log("MongoDB query success. XinBox Sites total: %o",z.length);
        // initial the distanceOfZ array 
        // (IMPORTANT: 1. the code block of setTimeout priories run than other code.
        //             2. the unlegal use the array before claim it cause kinds of errors.
        //             3. because of distanceOfZ[zj] exist it may use it before loop zi ach it.)
        for (var zi = 0; zi < z.length; zi++) {
            // initialize the distanceOfZ[zj]
            distanceOfZ[zi] = [];
                // set same z with distance 0
            distanceOfZ[zi][zi] = 0;
            // console.log(distanceOfZ[zi]);
        }

        for (var zi = 0; zi < (z.length - 1); zi++) {
            // calculate the distance between two z.
            for (var zj = zi + 1; zj < z.length; zj++) {
                distanceOfZ[zi][zj] = Math.round(((Math.abs(z[zi][3]-z[zj][3]) * metersLonPerDegree ) + (Math.abs(z[zi][4]-z[zj][4]) * metersLatPerDegree )) * 1000) / 1000;
                distanceOfZ[zj][zi] = distanceOfZ[zi][zj];
                // console.log("distanceOfZ[",zi,"][",zj,"] = distance between ",z[zi][0].slice(-2),z[zi][2]," and ",z[zj][0].slice(-2),z[zj][2]," = ",distanceOfZ[zi][zj],"meters.");
            }
            // console.log("only zi =",zi,distanceOfZ[zi]);
        }
        // console.log(distanceOfZ);
    }
    else
        throw new Error('MongoDB connection timeout.');  
}, 5000);

module.exports = distanceOfZ;
