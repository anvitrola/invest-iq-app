import React from "react";

import { Box } from "@mui/material";

export default function FlexContainer({
  alignItems,
  justifyContent,
  flexDirection,
  m, 
  p,
  children,
  sx
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "center",
        flexDirection: flexDirection ? flexDirection : "row",
        m: m ? m : 1,
        p: p && p,
        ...sx
      }}
    >
      {children}
    </Box>
  );
}
