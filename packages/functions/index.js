//const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./clixpesa-48d7e-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = require('./src/account.manager.js');