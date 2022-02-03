import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
 
const firebaseConfig = {
    apiKey: "AIzaSyB6N8o73G4Ntl8TFFPUaqXS5Zwv3LWNXXg",
    authDomain: "dailyreview-bc524.firebaseapp.com",
    projectId: "dailyreview-bc524",
    storageBucket: "dailyreview-bc524.appspot.com",
    messagingSenderId: "340354011154",
    appId: "1:340354011154:web:17311690b4dc3f2672c8cb"
  };
  

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, timestamp}