import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  /*apiKey: 'AIzaSyBmgYAlIyJcHqT3v9Z_1u0w1CCXvMIXVhc',
  authDomain: 'khuska-54cf3.firebaseapp.com',
  projectId: 'khuska-54cf3',
  storageBucket: 'khuska-54cf3.appspot.com',
  messagingSenderId: '1080274008049',
  appId: '1:1080274008049:web:df588dafbc5153c2267650',
  measurementId: 'G-W62GCQBCN0'*/
  apiKey: 'AIzaSyBmgYAlIyJcHqT3v9Z_1u0w1CCXvMIXVhc',
  authDomain: 'khuska-54cf3.firebaseapp.com',
  projectId: 'khuska-54cf3',
  storageBucket: 'khuska-54cf3.appspot.com',
  messagingSenderId: '1080274008049',
  appId: '1:1080274008049:web:dd9e742789d8e561267650',
  measurementId: 'G-GN766E6123'
};

initializeApp(firebaseConfig);
const authentication = getAuth();
const db = getFirestore();
const storage = getStorage();
export { authentication, db, storage };
