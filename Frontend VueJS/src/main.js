import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from '@/router'
//import Vue from 'vue';
//import { GmapMap, GmapPlaceInput } from 'vue2-google-maps';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD98fjbq9equCSMKWbYaTZ0xsrvjvKfA0E",
  authDomain: "sally-sweets-68b36.firebaseapp.com",
  projectId: "sally-sweets-68b36",
  storageBucket: "sally-sweets-68b36.appspot.com",
  messagingSenderId: "411822378728",
  appId: "1:411822378728:web:cd31d7d9adbaf2d7b4835d",
  measurementId: "G-H2SB6G58ZT"
};

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyCX-PtSmZ96UjzC2FiNvQk4rh-B1icBtvA',
//     libraries: 'places', // Add additional libraries if needed
//   },
//   installComponents: true,
// });

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
createApp(App).use(router).mount('#app')
