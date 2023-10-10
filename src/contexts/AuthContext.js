import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //token key. the way our token is identified in localstorage
  const TOKEN_KEY = "@investIQszA-token";

  useEffect(() => {
    //get token to send it in the header for next requests.
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) setAuthenticated(true);

    //render components after verifying if there's a token and creating handleAuth
    setLoading(false);
  }, []);

  async function handleAuth(token) {
    //saving token in localstorage under our key
    setAuthenticated(true);
    localStorage.setItem(TOKEN_KEY, token);
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem(TOKEN_KEY);
  }

  return (
    <Context.Provider value={{ authenticated, handleAuth, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
