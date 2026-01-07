import { auth, db } from "./firebase.js";
import {
  ref, push, onChildAdded
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messages = document.getElementById("messages");

onChildAdded(ref(db, "chats"), snap => {
  const p = document.createElement("p");
  p.innerText = snap.val().text;
  messages.appendChild(p);
});

window.send = () => {
  push(ref(db, "chats"), {
    sender: auth.currentUser.uid,
    text: msg.value,
    time: Date.now()
  });
  msg.value = "";
};

