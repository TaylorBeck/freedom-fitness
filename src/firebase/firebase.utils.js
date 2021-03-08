import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA2bV2OwTOzkNfcyWc1EBlJuabvgKFiUDg',
  authDomain: 'clothing-store-db-208c2.firebaseapp.com',
  projectId: 'clothing-store-db-208c2',
  storageBucket: 'clothing-store-db-208c2.appspot.com',
  messagingSenderId: '368359101591',
  appId: '1:368359101591:web:2eeb76b54689ec84bf45d2',
  measurementId: 'G-QPGC087VBP'
};

/* CREATE NEW USER */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userReference = firestore.doc(`users/${userAuth.uid}`);

  // Individual user's document snapshot
  const snapShot = await userReference.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userReference.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error Creating User: ', error.message);
    }
  }

  return userReference;
};

// Convert firebase snapshot into frontend usable collection object
// Firebase is not storing our routeName within the collection, so we must add it
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    // doc is the documentSnapshot. You must call data() on document snapshots
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  // Returns object with each collection as values - keys are 'hats', 'jackets', ...
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
