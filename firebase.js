// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBy9i40Zas3FSHEoRMA_Me_DXLSIpBnN74",
  authDomain: "privatechatapp-7acfd.firebaseapp.com",
  databaseURL: "https://privatechatapp-7acfd-default-rtdb.firebaseio.com",
  projectId: "privatechatapp-7acfd"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
