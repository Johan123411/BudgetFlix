import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Replace this with your own config details
var config = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_DB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DB_APP_ID
};
firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase
