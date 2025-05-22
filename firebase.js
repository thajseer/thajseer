import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(result => {
      document.getElementById("user-info").textContent = `Welcome, ${result.user.displayName}`;
    })
    .catch(error => {
      alert("Sign-in Failed: " + error.message);
    });
};

// Reviews functionality
window.addReview = async function() {
  const input = document.getElementById("reviewInput");
  const review = input.value.trim();
  if (!review) return;

  try {
    await addDoc(collection(db, "reviews"), {
      text: review,
      timestamp: new Date()
    });
    input.value = "";
    loadReviews();
  } catch (e) {
    alert("Error saving review: " + e.message);
  }
};

async function loadReviews() {
  const list = document.getElementById("reviewList");
  list.innerHTML = "";

  try {
    const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      list.appendChild(li);
    });
  } catch (e) {
    alert("Error loading reviews: " + e.message);
  }
}

window.onload = loadReviews;

export { db, collection, addDoc, getDocs, query, orderBy };