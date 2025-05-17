import React, { createContext, useState, useEffect } from "react";

// Create the context
const LoginContext = createContext();

// Create the provider component
const LoginContextProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user")) || null;
  const [user, setUser] = useState(storedUser);
  const isLoggedIn = !!user
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user)); // Store user in sessionStorage
    } else {
      sessionStorage.removeItem("user"); // Clear user from sessionStorage if logged out
    }
  }, [user]); // Update sessionStorage whenever the user state changes

  const value = {
    user,
    setUser,
    isLoggedIn,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
