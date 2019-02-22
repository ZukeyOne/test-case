const admin = require('firebase-admin')
const serviceAccount = require("./firebase_key.json")

var config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://my-test-409e3.firebaseio.com'
}

var app = admin.initializeApp(config)

console.log(app.options.credential === config.credential)
console.log(app.options.databaseURL === config.databaseURL)

function getAccessToken() {
    return new Promise((resolve, reject) => {
        var key = serviceAccount;
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize((err, tokens) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}