import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  ref, set, get
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// LOGIN
window.login = async function () {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      emailInput,
      passwordInput
    );

    const uid = userCred.user.uid;
    const snap = await get(ref(db, "users/" + uid));

    if (!snap.exists()) {
      alert("No role assigned ❌");
      return;
    }

    const role = snap.val().role;

    if (role === "admin") location.href = "admin.html";
    else if (role === "approved") location.href = "chat.html";
    else alert("Waiting for admin approval ⏳");

  } catch (err) {
    alert(err.message);
  }
};

// REQUEST ACCESS
window.requestAccess = async function () {
  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      emailInput,
      passwordInput
    );

    await set(ref(db, "users/" + userCred.user.uid), {
      name: nameInput,
      role: "pending"
    });

    alert("Request sent successfully ⏳");

  } catch (err) {
    alert(err.message);
  }
};
