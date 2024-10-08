'use client';
import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./firebase";
import { updateProfile } from "firebase/auth"; 
import { useTranslation } from 'react-i18next'; // Import useTranslation

export default function Auth() {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleEmailSignInOrSignUp = async () => {
    try {
      if (isSignUp) {
        // Sign up with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with name
        await updateProfile(user, { displayName: name });
      } else {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(isSignUp ? "Sign-Up Error:" : "Sign-In Error:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6">{t(isSignUp ? "Sign Up" : "Sign In")}</Typography>
      {isSignUp && (
        <TextField
          label={t("Name")}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <TextField
        label={t("Email")}
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label={t("Password")}
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleEmailSignInOrSignUp}
      >
        {t(isSignUp ? "Sign Up with Email" : "Sign In with Email")}
      </Button>
      <Button
        variant="contained"
        onClick={signInWithGoogle}
      >
        {t("Sign In with Google")}
      </Button>
      <Button
        variant="text"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {t(isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up")}
      </Button>
    </Box>
  );
}
