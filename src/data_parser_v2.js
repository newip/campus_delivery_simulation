'use strict';

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://hexin:hexin456@ds020228.mlab.com:20228/bot_simulation';

var z = new Array();

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
  console.log('Connected');
  const dbo = database.db('bot_simulation');
  const cursor = dbo.collection('bot_sites_data').find();
  var i = 0;
  
  const iterateSequentially = function(cursor, iteratorFn) {
    // infectious promises, keep returning them for then-chain
    return cursor.hasNext().then(function(yes) {
      // hasNext presumably gives a Bool
      if (yes) {
        // we have one, access it
        return cursor.next().then(function(doc) {
           // do something with it
          iteratorFn(i++, doc).then(function() {
            // and recurse, go on to the next one
            return iterateSequentially(cursor, iteratorFn);
          });
        });
      }
      // if we don't have one, resolve to move on
      return Promise.resolved();
    });
  }
  
  function iteratorFn(index, doc) {
    z[index] = [
      doc.properties.postalCode.slice(-3),
      doc.properties.postalCode,
      doc.properties.address,
      doc.geometry.coordinates[0],
      doc.geometry.coordinates[1]
    ];
  }

  // use it like:
  getStatus(cursor) {
    return iterateSequentially(cursor, this.updateStatus.bind(this));
  };
  
  database.close();

  console.log(z.length);
  console.log(z);

})


// r.connect({host: 'localhost', port: 28015}, function(err, conn) {
//   // TODO: Error handling.
//   r.table('numbers').run(conn, function(err, cursor) {
//       var i = 0;
//       cursor.each(function(err, row) {
//           console.log(["Row " + i + ":", row])
//           i += 1;
//           return processRow(row);
//       });
//   });
// });
