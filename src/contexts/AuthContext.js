import React, { createContext, useState, useEffect } from "react";

const Context = createContext();
const TOKEN_KEY = "@investIQszA-token";

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem(TOKEN_KEY) ? true : false);

  //token key. the way our token is identified in localstorage

  useEffect(() => {
    //get token to send it in the header for next requests.
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) setAuthenticated(true);

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
