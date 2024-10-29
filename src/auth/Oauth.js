import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Services/firebase.config";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../utils/URL";

// Google OAuth Provider
const googleProvider = new GoogleAuthProvider();

export const handleGoogleSignIn = async (onSuccess, onFailure) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const accessToken = await user.getIdToken();

    // Fetching user details
    const payload = {
      displayName: user.displayName, // Include display name
      email: user.email,
      photoURL: user.photoURL,
      accessToken: accessToken,
    };

    // Send JSON payload to Mock API
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Logged in successfully!");

    // Trigger success callback for navigation
    if (onSuccess) onSuccess();
    return response;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    toast.error(`Google Sign-In failed: ${error.message}`);

    // Trigger failure callback
    if (onFailure) onFailure(error);
  }
};
