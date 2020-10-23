import firebase from 'firebase';

const config = {
    // apiKey: "AIzaSyDC38LM4nmiiAhaY4ujGAS64zhPc3d_oug",
    // authDomain: "demoapp-c6d64.firebaseapp.com",
    // databaseURL: "https://demoapp-c6d64.firebaseio.com",
    // projectId: "demoapp-c6d64",
    // storageBucket: "demoapp-c6d64.appspot.com",
    // messagingSenderId: "905212193648",
    // appId: "1:905212193648:web:3588d928082c5643f53db5"
    apiKey: "AIzaSyAIAe3I086Ke8TXU4vT2JohE9-EyvFEoX4",
    authDomain: "kuwaitbankpaymentgateway.firebaseapp.com",
    databaseURL: "https://kuwaitbankpaymentgateway.firebaseio.com",
    projectId: "kuwaitbankpaymentgateway",
    storageBucket: "kuwaitbankpaymentgateway.appspot.com",
    messagingSenderId: "390335452623",
    appId: "1:390335452623:web:a2e571b7dcd9b1c0446eba",
    measurementId: "G-FFPNXCG4G6"
  }
  const Firebase = firebase.initializeApp(config);

  export default Firebase.database();