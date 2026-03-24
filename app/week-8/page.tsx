"use client";

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

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
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Login Page
        </h1>
        
        <div className="border-t border-gray-100 pt-6">
          {user ? (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-600 text-sm italic">Signed in as</p>
                <p className="font-semibold text-blue-900">{user.displayName}</p>
                <p className="text-sm text-blue-700">{user.email}</p>
              </div>
              
              <button 
                onClick={handleSignOut}
                className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-95 shadow-md"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignIn}
              className="group relative w-full flex justify-center items-center gap-3 py-3 px-4 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              {/* Simple GitHub Icon SVG */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
