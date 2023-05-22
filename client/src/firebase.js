import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDYdISJEoqqnzDuf6J4uI1ALH-aeMW9lAM',
    authDomain: 'clone-8dc44.firebaseapp.com',
    projectId: 'clone-8dc44',
    storageBucket: 'clone-8dc44.appspot.com',
    messagingSenderId: '325770462255',
    appId: '1:325770462255:web:5470c3233d5195e430b2da',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
