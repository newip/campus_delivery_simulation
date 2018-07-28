'use strict';

// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation';

// MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
//     console.log('Connected');
//     var dbo = database.db('bot_simulation');
//     var cursor = dbo.collection('bot_sites_data').find();
//     cursor.each(function(err, doc){
//         console.log(doc);
//     });
//     database.close()
// })

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

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("bot_simulation");
  var query = { "properties.postalCode": "100876-001-031" };
  dbo.collection("bot_sites_data").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(result[0])
    db.close();
  });
});