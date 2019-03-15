
const firebase = require('firebase')

// var config = {
//   apiKey: "AIzaSyAm64SISNxeanJFnN_ziEEJ5YED7KQzagI",
//   authDomain: "my-test-409e3.firebaseapp.com",
//   databaseURL: "https://my-test-409e3.firebaseio.com",
//   projectId: "my-test-409e3",
//   storageBucket: "my-test-409e3.appspot.com",
//   messagingSenderId: "655738439376"
// }

var fcmConfig = {
  apiKey: "AIzaSyAm64SISNxeanJFnN_ziEEJ5YED7KQzagI",
  authDomain: "my-test-409e3.firebaseapp.com",
  databaseURL: "https://my-test-409e3.firebaseio.com",
  projectId: "my-test-409e3",
  storageBucket: "my-test-409e3.appspot.com",
  messagingSenderId: "655738439376"
}
var app = firebase.initializeApp(fcmConfig)
var messaging = firebase.messaging()

// messaging.usePublicVapidKey("BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu");

// messaging.requestPermission().then(function() {
//   console.log('Notification permission granted.');
//   // TODO(developer): Retrieve an Instance ID token for use with FCM.
//   // ...
// }).catch(function(err) {
//   console.log('Unable to get permission to notify.', err);
// });

messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    console.log(currentToken)
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
  }
}).catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  // showToken('Error retrieving Instance ID token. ', err);
  // setTokenSentToServer(false);
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  // messaging.getToken().then(function(refreshedToken) {
  //   console.log('Token refreshed.');
  //   // Indicate that the new Instance ID token has not yet been sent to the
  //   // app server.
  //   setTokenSentToServer(false);
  //   // Send Instance ID token to app server.
  //   sendTokenToServer(refreshedToken);
  //   // ...
  // }).catch(function(err) {
  //   console.log('Unable to retrieve refreshed token ', err);
  //   showToken('Unable to retrieve refreshed token ', err);
  // });
});
