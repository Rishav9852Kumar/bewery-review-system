import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { config } from 'dotenv';

// config(); // Load environment variables from .env file

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyB8MGuXQpK30Vm1KscsN5xqtpWFf6s7k5s",
  authDomain: "bewery-review-system.firebaseapp.com",
  projectId: "bewery-review-system",
  storageBucket: "bewery-review-system.appspot.com",
  messagingSenderId: "840026759479",
  appId: "1:840026759479:web:9adae5e6c52cc5427abab2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
// const auth = getAuth(app);
// export { app, auth };
