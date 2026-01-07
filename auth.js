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
  const email = email.value;
  const password = password.value;

  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;

  const snap = await get(ref(db, "users/" + uid));
  const role = snap.val().role;

  if (role === "admin") location.href = "admin.html";
  else if (role === "approved") location.href = "chat.html";
  else alert("Waiting for approval ⏳");
};

// REQUEST ACCESS
window.requestAccess = async function () {
  const userCred = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );

  await set(ref(db, "users/" + userCred.user.uid), {
    name: name.value,
    role: "pending"
  });

  alert("Request sent ⏳");
};
