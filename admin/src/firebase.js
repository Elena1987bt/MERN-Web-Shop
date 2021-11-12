// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBNPmxG-CB4EHG-dj9WHDuKYkFgzYuAD0M',
  authDomain: 'web-shop-mern.firebaseapp.com',
  projectId: 'web-shop-mern',
  storageBucket: 'web-shop-mern.appspot.com',
  messagingSenderId: '409768708182',
  appId: '1:409768708182:web:6a33f66c40368416ed13f7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
