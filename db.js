const firebase = require("firebase");
var { firebaseKey, authDomain, databaseURL, storageBucket } = require("./keys");

var config = {
  apiKey: firebaseKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  storageBucket: storageBucket
};
firebase.initializeApp(config);

var database = firebase.database();

module.exports = database;
