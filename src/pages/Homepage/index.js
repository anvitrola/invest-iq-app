import React from "react";
import { DataSection, HomepageContainer } from "./Homepage.styles";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataCards from "../../components/DataCards/DataCards";
import CustomSection from "../../components/CustomSection";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <HomepageContainer>
      <CustomSection gridArea="appeal">
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography
              style={{ color: "black" }}
              fontWeight={700}
              variant="h3"
              component="h3"
            >
              Be the smarter investor
            </Typography>
            <Typography
              style={{ color: "137DC5", width: "70%", alignSelf: "center", fontWeight: 500 }}
              variant="h6"
              component="h6"
            >
              Powerful portfolio tracking software that lets you check any stock
              price changes in one place and be notified whenever it hits your
              bounderies.
            </Typography>
          </Stack>
          <Button
            onClick={() => navigate("/register")}
            variant="contained"
            sx={{
              width: "15rem",
              alignSelf: "center",
              backgroundColor: "var(--blue)",
            }}
          >
            Sign up for free
          </Button>
        </Stack>
      </CustomSection>
      <DataSection>
        <DataCards />
      </DataSection>
    </HomepageContainer>
  );
}
