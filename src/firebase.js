import firebase from 'firebase'
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjkB5ZaNImOm8ZtG2105tPchayQxEMb6w",
    authDomain: "fun-food-friends-d9363.firebaseapp.com",
    databaseURL: "https://fun-food-friends-d9363.firebaseio.com",
    projectId: "fun-food-friends-d9363",
    storageBucket: "fun-food-friends-d9363.appspot.com",
    messagingSenderId: "451781367856"
  };
  firebase.initializeApp(config);
  
  export default firebase;