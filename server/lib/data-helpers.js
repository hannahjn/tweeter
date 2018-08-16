"use strict";

const simulateDelay = require("./util/simulate-delay");

module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection('tweets').insertOne(newTweet, function(err, r) {
          callback(null);
          // assert.equal(null, err);
          // asert.equal(1, r.insertedCount);
        })
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        db.collection('tweets').find().toArray((err, tweets) => {
        // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets);
        });
    }
  };
}
