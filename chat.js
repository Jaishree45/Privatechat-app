import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  // your config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

let userName = "";

// 🔹 Get user name from DB
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  const snapshot = await get(ref(db, "users/" + user.uid));
  userName = snapshot.val().name;

  // 🔹 Show admin button if admin
  if (user.email === "admin@gmail.com") {
    document.getElementById("adminBar").style.display = "flex";
  }
});

// 🔹 Send message
window.send = () => {
  const msg = document.getElementById("msg").value;

  if (msg === "") return;

  push(ref(db, "messages"), {
    text: msg,
    sender: userName,
    uid: auth.currentUser.uid
  });

  document.getElementById("msg").value = "";
};

// 🔹 Receive messages
onChildAdded(ref(db, "messages"), (snapshot) => {
  const data = snapshot.val();

  const p = document.createElement("p");
  p.innerHTML = `<strong>${data.sender}:</strong> ${data.text}`;

  document.getElementById("messages").appendChild(p);
});
