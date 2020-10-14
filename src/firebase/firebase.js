import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD6rcKQu00-a4qTOm0Al5vlB2yspDoZi0M",
  authDomain: "serverless-react-demo.firebaseapp.com",
  databaseURL: "https://serverless-react-demo.firebaseio.com",
  projectId: "serverless-react-demo",
  storageBucket: "serverless-react-demo.appspot.com",
  messagingSenderId: "123342841609",
  appId: "1:123342841609:web:04b182164cf1c6975b15d8"
};
export const firebase_=firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const rdb=firebase.database()
export const storage = firebase.storage()
export const storageRef = storage.ref();
const demoRef = storage.ref()
