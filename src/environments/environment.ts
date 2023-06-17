// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDgZahTTrA1q3WExMd5XApxRKFFdlGIhng",
    authDomain: "sdcc-exam.firebaseapp.com",
    projectId: "sdcc-exam",
    storageBucket: "sdcc-exam.appspot.com",
    messagingSenderId: "453644808155",
    appId: "1:453644808155:web:f8c963ab1df32dfc6d01fe",
    measurementId: "G-6G0TM6LMPH"
  },
  backendApi: "http://localhost:8080/api/v1/",
  backendPublicApi: "http://localhost:8080/api/v1/public/"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);