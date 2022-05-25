import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, doc, setDoc} from 'firebase/firestore';
import { collection, query, where, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd1Jjk5wMpvIjoTSQbniy_0yJOrayLxlw",
  authDomain: "fb-crud-react-46934.firebaseapp.com",
  projectId: "fb-crud-react-46934",
  storageBucket: "fb-crud-react-46934.appspot.com",
  messagingSenderId: "398120834304",
  appId: "1:398120834304:web:f3952d8524ab220a0fcfe5"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);

export const db = getFirestore(fb);