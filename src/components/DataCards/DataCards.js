import React from "react";
import { Stack, Typography } from "@mui/material";
import FlexContainer from "../../components/FlexContainer";

const cardMessages = [
  {
    number: 300,
    cent: true,
    text: "Investors trust in Invest IQ",
    color: "var(--orange)",
  },
  {
    number: 250,
    cent: true,
    text: "Stocks, ETFs & funds supported",
    color: "var(--dark-blue)",
  },
  {
    number: 300,
    cent: false,
    text: "Software, broker & partner integrations",
    color: "rgb(255, 194, 26)",
  },
];

export default function DataCards() {
  return (
    <FlexContainer>
      {cardMessages.map((message) => (
        <FlexContainer
          sx={{ width: "350px" }}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack>
            <FlexContainer alignItems="end">
              <Typography
                style={{ color: "black" }}
                fontWeight={700}
                variant="h3"
                component="h3"
              >
                {message.number}
              </Typography>
              {message.cent && (
                <Typography
                  style={{ color: "black" }}
                  fontWeight={700}
                  variant="h6"
                  component="h6"
                >
                  K+
                </Typography>
              )}
            </FlexContainer>

            <div
              style={{
                width: "300px",
                height: "15px",
                backgroundColor: message.color,
              }}
            ></div>
          </Stack>

          <Typography
            style={{ color: "black", width: "70%" }}
            fontWeight={700}
            variant="h6"
            component="h6"
            sx={{ mt: 3 }}
          >
            {message.text}
          </Typography>
        </FlexContainer>
      ))}
    </FlexContainer>
  );
}
