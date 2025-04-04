import React, { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import { auth } from "./configs/firebaseConfig";

function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [user, setUser] = useState(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // If user is logged in, show Dashboard
  if (user) {
    return <Dashboard user={user} onLogout={() => auth.signOut()} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {currentPage === "signin" && <SignIn onSwitch={() => setCurrentPage("signup")} onForgot={() => setCurrentPage("forgot")} />}
      {currentPage === "signup" && <SignUp onSwitch={() => setCurrentPage("signin")} />}
      {currentPage === "forgot" && <ForgotPassword onBack={() => setCurrentPage("signin")} />}
    </div>
  );
}

export default App;
