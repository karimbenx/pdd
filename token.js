// Import and configure Firebase on your frontend
import { getAuth } from "firebase/auth";

const auth = getAuth();
auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Get the user token
    userCredential.user.getIdToken().then((token) => {
      console.log("Firebase User Token:", token);

      // Send this token to your backend
    });
  })
  .catch((error) => {
    console.error("Error signing in:", error);
  });
