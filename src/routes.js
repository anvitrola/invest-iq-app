import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./layout";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import StockHistoryChart from "./pages/StockHistoryChart";
import Homepage from "./pages/Homepage";

const Dashboard = lazy(() => import("./pages/Dashboard"));

export function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/history/:ticker", element: <StockHistoryChart />, }, 
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}

export function publicRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: "/home", element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  };
}
