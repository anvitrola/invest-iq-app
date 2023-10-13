import React, { useContext, Suspense } from "react";
import "./styles/global.css";

import { AppBody } from "./styles/App.styles.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Context } from "./contexts/AuthContext";
import { privateRoutes, publicRoutes } from "./routes";
import Loader from "./components/Loader/Loader";

function App() {
  const { authenticated } = useContext(Context);

  const router = createBrowserRouter([
    authenticated ? privateRoutes() : {},
    publicRoutes(),
  ]);

  return (
    <AppBody className="App">
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppBody>
  );
}

export default App;
