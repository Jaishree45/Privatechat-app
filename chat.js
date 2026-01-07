import { auth, db } from "./firebase.js";
import {
  ref,
  push,
  onChildAdded,
  get
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const messagesBox = document.getElementById("messages");
const adminBar = document.getElementById("adminBar");
const msgInput = document.getElementById("msg");

let userName = "";

// 🔐 AUTH + ROLE CHECK
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  const snap = await get(ref(db, "users/" + user.uid));
  if (!snap.exists()) return;

  userName = snap.val().name;

  if (snap.val().role === "admin") {
    adminBar.style.display = "flex"; // ✅ SHOW REQUEST BUTTON
  }
});

// 💬 LOAD CHATS (USE EXISTING PATH)
onChildAdded(ref(db, "chats"), (snapshot) => {
  const data = snapshot.val();

  const p = document.createElement("p");
  p.innerHTML = `<strong>${data.sender}:</strong> ${data.text}`;

  messagesBox.appendChild(p);
  messagesBox.scrollTop = messagesBox.scrollHeight;
});

// ✉️ SEND MESSAGE
window.send = () => {
  if (!msgInput.value.trim()) return;

  push(ref(db, "chats"), {
    text: msgInput.value,
    sender: userName,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  msgInput.value = "";
};
