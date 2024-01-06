// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDryP334gs8ZrPAFgxwInvwhhGJeDMANS4",
    authDomain: "concord-f47ee.firebaseapp.com",
    projectId: "concord-f47ee",
    storageBucket: "concord-f47ee.appspot.com",
    messagingSenderId: "987747513389",
    appId: "1:987747513389:web:12558f869fc2f9ae4474a4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//get database
const firebaseDB = getFirestore(firebaseApp);
//auth provider 
const provider = new GoogleAuthProvider();


export { provider};
export default firebaseDB;