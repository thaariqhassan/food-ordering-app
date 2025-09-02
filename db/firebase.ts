// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const configuration = {
  apiKey: "AIzaSyAMUA2dqYfoxBsRH9iUR3110loFiVmWL_0",
  authDomain: "foodapp-8740e.firebaseapp.com",
  projectId: "foodapp-8740e",
  storageBucket: "foodapp-8740e.firebasestorage.app",
  messagingSenderId: "429786435562",
  appId: "1:429786435562:web:1ac003688a416ffad82c93"
};

// Initialize Firebase
const app = initializeApp(configuration);

const db = getFirestore(app);
export default db;

// utils/getMenuData.ts
import { collection, getDocs } from "firebase/firestore";
export const getMenuData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "menu"));
    const items: object[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

