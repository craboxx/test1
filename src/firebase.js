import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
projectId: "myalbumproject-dca7f",

};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);