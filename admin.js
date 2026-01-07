import { db } from "./firebase.js";
import {
  ref, onValue, update, remove
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const list = document.getElementById("list");

onValue(ref(db, "users"), snap => {
  list.innerHTML = "";
  snap.forEach(user => {
    if (user.val().role === "pending") {
      const li = document.createElement("li");
      li.innerHTML = `
        ${user.val().name}
        <button onclick="approve('${user.key}')">Approve</button>
        <button onclick="reject('${user.key}')">Reject</button>
      `;
      list.appendChild(li);
    }
  });
});

window.approve = uid => {
  update(ref(db, "users/" + uid), { role: "approved" });
};

window.reject = uid => {
  remove(ref(db, "users/" + uid));
};

