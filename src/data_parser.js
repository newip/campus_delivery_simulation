'use strict';

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation';

var z = new Array();

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
    console.log('Connected');
    var dbo = database.db('bot_simulation');
    var cursor = dbo.collection('bot_sites_data').find();
    var i = 0;
    cursor.each( function(err, doc){
        // console.log(doc);
        if ( doc === null ) {
            // Handle z here because all z node loaded here.
            return true;
        }
        z[i] = [
          doc.properties.postalCode.slice(-3),
          doc.properties.postalCode,
          doc.properties.address,
          doc.geometry.coordinates[0],
          doc.geometry.coordinates[1]
        ];
        // console.log(i);
        // console.log(z[i]);
        // console.log(cursor.hasNext());
        // if (cursor.hasNext()) return true;
        i++;
    });
    // var i = z.length;
    // while (i--) {
    //   var j = 5;
    //   while (j--) {
    //     console.log(z[i,j]);
    //   }
    // }
    database.close();
    // console.log(z.length);
    // console.log(z);
    // console.log(y.length);
    // console.log(y);
})

setTimeout(function(){
    console.log(z.length);
    console.log(z);
    // var i = z.length;
    // while (i--) {
    //   var j = 5;
    //   while (j--) {
    //     console.log(z[i][j]);
    //   }
    // }
},5000);
