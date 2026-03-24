"use client";
 
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User, // Import the User type from Firebase
} from "firebase/auth";
import { auth } from "./firebase";
 
const AuthContext = createContext<any>(null);
 
// Added ReactNode type for children to fix the 'any' type error
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Explicitly set the state type to User or null
  const [user, setUser] = useState<User | null>(null);
 
  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };
 
  const firebaseSignOut = () => {
    return signOut(auth);
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []); // Removed 'user' from dependency array to prevent unnecessary re-runs
 
  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};
