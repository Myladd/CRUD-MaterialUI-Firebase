import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJzBvQcTGc5OJoJXju4esYdRpgMMJXBVE",
    authDomain: "crud-materialui.firebaseapp.com",
    projectId: "crud-materialui",
    storageBucket: "crud-materialui.appspot.com",
    messagingSenderId: "916774086864",
    appId: "1:916774086864:web:89671b29113e9bcd1816d5",
    measurementId: "G-SC09CZTWJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export default app
