import React from "react";
import { CircularProgress, Container } from "@mui/material";

export default function Loader({ gridArea }) {
  return (
    <Container
      sx={{
        gridArea: gridArea ? gridArea : "main",
        height: "80vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />;
    </Container>
  );
}
