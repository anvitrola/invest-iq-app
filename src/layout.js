import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from './components/Topbar/Topbar';
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Outlet />
      <Footer/>
    </>
  );
}
