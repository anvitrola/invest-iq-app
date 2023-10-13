import React, { useEffect, useState } from "react";
import { StockHistoryChartContainer } from "./StockHistoryChart.styles";
import Chart from "../../components/Chart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Loader from "../../components/Loader/Loader";

function formatDate(inputDate) {
  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
}

const headers = ["Date", "Close", "Change", "Status"];

function extractHoursAndSeconds(dateString) {
  // Parse the date string into a JavaScript Date object
  const date = new Date(dateString);

  // Extract the hours and seconds
  const hours = date.getHours();
  const seconds = date.getSeconds();

  // Format the extracted values as a string
  const formattedTime =
    hours.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return formattedTime;
}

export default function StockHistoryChart() {
  const { ticker } = useParams();
  const accessToken = localStorage.getItem("@investIQszA-token");

  const [loading, setLoading] = useState(true);

  const [stockHistory, setStockHistory] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);

  async function getStockData() {
    const endpoints = [
      `/stock-monitoring/history?ticker=${ticker}`,
      `/stock-monitoring/details?ticker=${ticker}`,
    ];

    try {
      const [stockHistoryResponse, stockDetailsResponse] = await Promise.all(
        endpoints.map((endpoint) =>
          axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-type": "application/json",
            },
          })
        )
      );

      if (stockHistoryResponse.data) setStockHistory(stockHistoryResponse.data);

      if (stockDetailsResponse.data) setStockDetails(stockDetailsResponse.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getStockData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <StockHistoryChartContainer>
      {stockDetails && (
        <FlexContainer>
          <Stack style={{ gridArea: "title", padding: "4rem" }} spacing={4}>
            <Stack spacing={1}>
              <Typography
                style={{
                  color: "var(--blue",
                  fontWeight: 600,
                  letterSpacing: ".5rem",
                }}
                variant="h3"
                component="h3"
              >
                {ticker}
              </Typography>
              <Box>
                <h3 style={{ color: "var(--dark-blue)" }}>
                  Lower Bound R${stockDetails.lower_bound} / Upper Bound R$
                  {stockDetails.upper_bound}
                </h3>
              </Box>
            </Stack>

            <Stack
              sx={{
                backgroundColor: "whitesmoke",
                borderRadius: "3px",
              }}
              spacing={3}
            >
              <h2>
                <b>{stockDetails.name}</b>
              </h2>

              <Box>
                <Stack spacing={1}>
                  <h4>Close {stockDetails.close} BRL</h4>
                  <h4>Change of {stockDetails.change} BRL</h4>
                  <h4>Volume {stockDetails.volume}</h4>
                </Stack>
              </Box>

              <h6>Updated at {formatDate(stockDetails.updated_at)}</h6>
            </Stack>
          </Stack>
        </FlexContainer>
      )}

      <Chart
        style={{ gridArea: "chart" }}
        data={
          stockHistory.length
            ? stockHistory
            : [
                {
                  change: stockDetails.change,
                  date: extractHoursAndSeconds(stockDetails.updated_at),
                },
              ]
        }
      />

      {stockHistory && stockHistory.length ? (
        <>
          <TableContainer
            style={{ gridArea: "table", padding: "5rem" }}
            component={Paper}
          >
            <Stack spacing={2} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h5"
                sx={{ color: "var(--dark-blue)", fontWeight: "600" }}
              >
                Stock Price History
              </Typography>
              <h4 style={{ color: "var(--gray)" }}>
                Our Comprehensive Record of Stock Price Changes, Old Prices,
                Shifts, and Timestamps: Providing Clarity on Market Fluctuations
                for Informed Decision-Making
              </h4>
            </Stack>

            <Table>
              <TableHead sx={{ backgroundColor: "rgb(32 45 172 / 83%)" }}>
                <TableRow>
                  {headers.map((header, idx) => (
                    <TableCell align="left" sx={{ color: "whitesmoke" }}>
                      <b>{header.toUpperCase()}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {stockHistory.map((row) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.close}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.change}
                    </TableCell>
                    <TableCell>
                      {row.change > 0 ? (
                        <FaArrowAltCircleUp color="green" />
                      ) : (
                        <FaArrowAltCircleDown color="red" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <FlexContainer
          flexDirection="column"
          sx={{
            gridArea: "table",
            padding: "4rem",
            backgroundColor: "var(--white)",
            height: "30rem",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ color: "var(--dark-blue)", fontWeight: "600", mb: 3 }}
          >
            No history yet
          </Typography>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              color: "var(--dark-blue)",
              width: "50%",
              textAlign: "center",
            }}
          >
            Don't worry, we're here to help! We'll keep you informed whenever
            the stock price crosses your upper or lower limit.
          </Typography>
        </FlexContainer>
      )}
    </StockHistoryChartContainer>
  );
}
