import React, { useContext } from "react";
import "./styles/global.css";

import { AppBody } from "./styles/App.styles.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Context } from "./contexts/AuthContext";
import { privateRoutes, publicRoutes } from "./routes";

function App() {
  const { authenticated } = useContext(Context);

  const router = createBrowserRouter([
    authenticated ? privateRoutes() : {},
    publicRoutes(),
  ]);

  return (
    <AppBody className="App">
      <RouterProvider router={router} />
    </AppBody>
  );
}

export default App;
