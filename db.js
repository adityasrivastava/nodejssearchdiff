var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL 
var url = 'mongodb://localhost:27017/scorace_csv_db';

// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  
  findDocuments(db, function(db, data){

      if(data) {
          console.log("Connection being close done with data");
          db.close();
      }

      console.log(data);
  });

});


var findDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('TaggedQuestion');
  // Find some documents 
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");

    if(err) {
        console.log(err);
    }else{
        callback(db, docs);
    }

  });
}

