import { auth, db } from "./firebase.js";
import {
  ref, push, onChildAdded, get
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messages = document.getElementById("messages");
const adminBar = document.getElementById("adminBar");

// CHECK ROLE
auth.onAuthStateChanged(async user => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  const snap = await get(ref(db, "users/" + user.uid));
  if (!snap.exists()) return;

  if (snap.val().role === "admin") {
    adminBar.style.display = "flex";
  }
});

// LOAD MESSAGES
onChildAdded(ref(db, "chats"), snap => {
  const p = document.createElement("p");
  p.innerText = snap.val().text;
  messages.appendChild(p);
});

// SEND MESSAGE
window.send = () => {
  if (!msg.value.trim()) return;

  push(ref(db, "chats"), {
    sender: auth.currentUser.uid,
    text: msg.value,
    time: Date.now()
  });

  msg.value = "";
};
