
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const fireBaseConfig = {
    apiKey: "AIzaSyAOfK-NcDVvgAuIWCmYh0RL-xij1vEQ7KU",
    authDomain: "event-management-db-ca5bb.firebaseapp.com",
    projectId: "event-management-db-ca5bb",
    storageBucket: "event-management-db-ca5bb.firebasestorage.app",
    messagingSenderId: "590232021067",
    appId: "1:590232021067:web:b7866b2c05068fa903c5ce",
    measurementId: "G-463Y62DJGX"
}

const app = initializeApp(fireBaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};