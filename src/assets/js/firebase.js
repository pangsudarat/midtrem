// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR8kGKGTbX3ZoLoU2Zs4s_AQ5ZhkB7RyE",
  authDomain: "my-web-d42e6.firebaseapp.com",
  projectId: "my-web-d42e6",
  storageBucket: "my-web-d42e6.appspot.com",
  messagingSenderId: "833297466933",
  appId: "1:833297466933:web:ac04e9ed0e902ad845537c",
  measurementId: "G-RN71MDRYJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };