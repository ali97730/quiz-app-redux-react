import firebase from "firebase";

export const firebaseConfig = {
    apiKey: "AIzaSyAFI9BgASjHV0_4RMu5oDh6AZIQ00E1jhc",
    authDomain: "quiz-app-mcq.firebaseapp.com",
    projectId: "quiz-app-mcq",
    storageBucket: "quiz-app-mcq.appspot.com",
    messagingSenderId: "338573986515",
    appId: "1:338573986515:web:36e23b7a8036ea0ebf2226",
    measurementId: "G-V67ZYLD0CF"
  };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
 
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider;


  export {auth,provider};
  
