import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAQj8OiMjIK_wogU2RFp5mVgacq02cwOlQ",
  authDomain: "floopyinn-433b3.firebaseapp.com",
  databaseURL: "https://floopyinn-433b3-default-rtdb.firebaseio.com",
  projectId: "floopyinn-433b3",
  storageBucket: "floopyinn-433b3.firebasestorage.app",
  messagingSenderId: "853513840939",
  appId: "1:853513840939:web:84c03ecdb0d92b83f53d6e",
  measurementId: "G-FXRPETQV11"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const database = getDatabase(app);

export { auth, googleProvider, facebookProvider, database, analytics };