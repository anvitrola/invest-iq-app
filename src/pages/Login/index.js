import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import AuthForm from "../../components/AuthForm";
import FlexContainer from "../../components/FlexContainer";

function Login() {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "90vh",
        padding: 0,
      }}
    >
      <FlexContainer
        sx={{
          height: "100%",
          backgroundColor: "#ff823f24",
        }}
      >
        <Stack spacing={3} style={{ width: "70%"}}>
          <Typography
            variant="h4"
            style={{
              textAlign: "center",
              color: "var(--dark-blue)",
              fontWeight: 600
            }}
          >
            Make smart investment decisions with real-time stock price tracking.
          </Typography>

          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "70%", fontWeight: 500, alignSelf: 'center' }}
          >
            Set your negotiation boundaries and receive instant notifications
            when opportunities arise
          </Typography>
        </Stack>
      </FlexContainer>

      <Box>
        <Stack
          style={{
            padding: "2rem",
            alignItems: "center",
          }}
          spacing={4}
        >
          <Typography
            variant="h5"
            component="h5"
            fontWeight={600}
            sx={{ color: "var(--dark-blue)" }}
          >
            LOGIN
          </Typography>

          <AuthForm isSignUp={false} />
        </Stack>
      </Box>
    </section>
  );
}

export default Login;
