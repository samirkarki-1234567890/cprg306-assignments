"use client"; // <--- 1. Add this!

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // 2. Wrap your sign-in logic in functions for buttons
  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <h1>Login Page</h1>
      
      {/* 3. Conditional rendering based on auth status */}
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign in with GitHub</button>
      )}
    </main>
  );
}
