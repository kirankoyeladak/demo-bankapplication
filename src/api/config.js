import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDC38LM4nmiiAhaY4ujGAS64zhPc3d_oug",
    authDomain: "demoapp-c6d64.firebaseapp.com",
    databaseURL: "https://demoapp-c6d64.firebaseio.com",
    projectId: "demoapp-c6d64",
    storageBucket: "demoapp-c6d64.appspot.com",
    messagingSenderId: "905212193648",
    appId: "1:905212193648:web:3588d928082c5643f53db5"
  }
  const Firebase = firebase.initializeApp(config);

  export default Firebase.database();