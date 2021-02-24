import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA2bV2OwTOzkNfcyWc1EBlJuabvgKFiUDg",
  authDomain: "clothing-store-db-208c2.firebaseapp.com",
  projectId: "clothing-store-db-208c2",
  storageBucket: "clothing-store-db-208c2.appspot.com",
  messagingSenderId: "368359101591",
  appId: "1:368359101591:web:2eeb76b54689ec84bf45d2",
  measurementId: "G-QPGC087VBP"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
