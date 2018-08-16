'use strict';

const {MongoClient} = require("mongodb");
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';
// 27017 is the default port for mongo
MongoClient.connect(MONGODB_URI, ( err, db) => {
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }
    //the connection starts here
    console.log(`Connected to mongodb: ${MONGODB_URI}`);
    //any programme that needs to use the connection must be invoked
    // from within here. This is where the magic happens. 

    // let's find all the tweets
    function getTweets(callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
      }
    //   The function can then be invoked. Even if 'getTweets' is passed to another scope,
    //  it still has closure over db so will still work. 
      getTweets((err, tweets) => {
        if (err) throw err;
    
        console.log("Logging each tweet:");
        for (let tweet of tweets) {
          console.log(tweet);
        }
    

        db.close();
    })
})
// TO NOTE:
// this is over simplified, getTweets would be defined here and called elsewhere,
// probably in a different DeviceLightEvent. 
// The important this is that the connected database is in scope when getTweets is defined.
// Notice how getTweets accepts a callback arg, then calls an async function that takes a callback, 
// and finally forwards the response to its callback arg.