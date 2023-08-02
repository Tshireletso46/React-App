import React, { useState } from "react";
import supabase from "../components/Supabase"; // Assuming supabase is exported from your supabase.js file

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) {
        setError(error.message);
      } else {
        console.log("User logged in:", user);
        // You can redirect the user to the main app page after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        console.log("User signed up:", user);
        // You can redirect the user to the main app page after successful signup
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to the App!</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LandingPage;


 