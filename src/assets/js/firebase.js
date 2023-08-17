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
    apiKey: "AIzaSyCsOcKNXsFcpOiFf_VUK_a5oJVll_-1lVo",
    authDomain: "animal-f1234.firebaseapp.com",
    projectId: "animal-f1234",
    storageBucket: "animal-f1234.appspot.com",
    messagingSenderId: "6374636602",
    appId: "1:6374636602:web:21d12fb034c8fe66228903",
    measurementId: "G-74VH5R6YR7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };