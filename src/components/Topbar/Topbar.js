import React, { useContext, useEffect, useState } from "react";

import logo from "../../assets/images/Logo.png";

import { Box, Button } from "@mui/material";
import { TopbarContainer, Logo, Navbar } from "./Topbar.styles";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/AuthContext";
import FlexContainer from "../FlexContainer";

export default function Topbar() {
  const { authenticated, handleLogout } = useContext(Context);
  const [logoRoute, setLogoRoute] = useState("/home");
  const navigate = useNavigate();

  console.log(logoRoute);

  async function logout() {
    handleLogout();
  }

  useEffect(() => {
    if (authenticated) setLogoRoute("/");
  }, [authenticated]);

  return (
    <TopbarContainer>
      <Box>
        <Link to={logoRoute}>
          <Logo>
            <img
              src={logo}
              alt={
                "Logo da Doarte. A palavra escrita normalmente, mas a letra 'O' é um círculo formado por mãos que se apoiam."
              }
            />
          </Logo>
        </Link>
      </Box>

      <FlexContainer>
        {!authenticated && (
          <Box>
            <Navbar>
              <a>
                <li>Features</li>
              </a>
              <a>
                <li>Resources</li>
              </a>
              <a href="https://www.linkedin.com/in/anvitrola/" target="_blank">
                <li>About us</li>
              </a>
            </Navbar>
          </Box>
        )}
        <Box sx={{ ml: 3 }}>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => {
              authenticated ? navigate("/") : navigate("/register");
            }}
          >
            {authenticated ? "Portfolio" : " Sign Up"}
          </Button>
          <Button
            sx={{ backgroundColor: "var(--blue)", mr: 1, color: "white" }}
            variant="contained"
            onClick={() => {
              authenticated ? logout() : navigate("/login");
            }}
          >
            {authenticated ? "Logout" : "Login"}
          </Button>
        </Box>
      </FlexContainer>
    </TopbarContainer>
  );
}
