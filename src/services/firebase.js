import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAwsxEWFC57vfMd71Rcsf3_T7jn3PjqwlM',
  authDomain: 'ma-realtime-redux.firebaseapp.com',
  databaseURL: 'https://ma-realtime-redux.firebaseio.com',
  projectId: 'ma-realtime-redux',
  storageBucket: 'ma-realtime-redux.appspot.com',
  messagingSenderId: '1096562687599'
};

//the root app just in case we need it
export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();