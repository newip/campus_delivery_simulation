'use strict';

/**
 * 
 * @fileOverview This file is using for parse geojson data to Arrays.
 * No dependencies
 * @author xin.he@126.com (Robin He)
 */

'use strict';

// ListCollections for exeamples.
// var mongo = require('mongodb');
// var assert = require('assert');
// var MongoClient = mongo.MongoClient;
// var url = 'mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation';

// MongoClient.connect(url, (err, database) => {
//     assert.equal(null, err);
//     var dbo = database.db('bot_simulation');
//     dbo.listCollections().toArray((err, collections) => {
//         assert.equal(err, null);
//         console.dir(collections);
//         database.close();
//     });
// });

// A good solution for using query. It is a whole element in array result[0].
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation";

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("bot_simulation");
//   var query = { "properties.postalCode": "100876-001-031" };
//   dbo.collection("bot_sites_data").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     console.log(result[0])
//     db.close();
//   });
// });

// A good and typical solution for cursor.each.
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation';

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
    console.log('Connected');
    var dbo = database.db('bot_simulation');
    var cursor = dbo.collection('bot_sites_data').find();
    cursor.each(function(err, doc){
        console.log(doc);
    });
    database.close()
})


// solution with async 
var q = async.queue(function (doc, callback) {
    // code for your update
    collection.update({
      _id: doc._id
    }, {
      $set: {hi: 'there'}
    }, {
      w: 1
    }, callback);
  }, Infinity);
  
  var cursor = collection.find(query);
  cursor.each(function(err, doc) {
    if (err) throw err;
    if (doc) q.push(doc); // dispatching doc to async.queue
  });
  
  q.drain = function() {
    if (cursor.isClosed()) {
      console.log('all items have been processed');
      db.close();
    }
  }



//  below follows a solution using Q promises.
var Q = require('q');
var client = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/test';

client.connect(url, function(err, db) {
  if (err) throw err;

  var promises = [];
  var query = {}; // select all docs
  var collection = db.collection('demo');
  var cursor = collection.find(query);

  // read all docs
  cursor.each(function(err, doc) {
    if (err) throw err;

    if (doc) {

      // create a promise to update the doc
      var query = doc;
      var update = { $set: {hi: 'there'} };

      var promise = 
        Q.npost(collection, 'update', [query, update])
        .then(function(updated){ 
          console.log('Updated: ' + updated); 
        });

      promises.push(promise);
    } else {

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
    console.log('Connected');
    var dbo = database.db('bot_simulation');
    var cursor = dbo.collection('bot_sites_data').find();
    var z = new Array();
    var i = 0;
    cursor.each( function(err, doc){
        // console.log(doc);
        if ( doc === null ) return true;
        z[i] = [
          doc.properties.postalCode.slice(-3),
          doc.properties.postalCode,
          doc.properties.address,
          doc.geometry.coordinates[0],
          doc.geometry.coordinates[1]
        ];
        // console.log(i);
        // console.log(z[i]);
        return z[i];
        i++;
        // console.log(cursor.hasNext());
        // if (cursor.hasNext()) return true;
    });
    console.log(z.length);
    console.log(z);
    // var i = z.length;
    // while (i--) {
    //   var j = 5;
    //   while (j--) {
    //     console.log(z[i,j]);
    //   }
    // }
    database.close();
      })
      .fail(console.error);
    }
  });
});
