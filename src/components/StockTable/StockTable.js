import React, { useEffect, useState } from "react";
import axios from "axios";

import {
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
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import FlexContainer from "../FlexContainer";

const headers = [
  "Stock (Ticker)",
  "Name",
  "Volume",
  "Change",
  "Lower Bound",
  "Upper Bound",
  "Close",
];

export default function StockTable({ refreshStockList, setRefreshStockList }) {
  const [monitoredStocksList, setMonitoredTickersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function getTickersList() {
    try {
      const accessToken = localStorage.getItem("@investIQszA-token");

      const response = await axios.get("/stock-monitoring/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      });

      if (response.data) {
        setMonitoredTickersList(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTickersList();
  }, []);

  useEffect(() => {
    if (refreshStockList) getTickersList();

    return () => {
      setRefreshStockList(false);
    };
  }, [refreshStockList]);

  if (loading) {
    return <Loader gridArea="table" />;
  }

  return (
    <Stack
      spacing={4}
      sx={{ gridArea: "table", padding: "0rem 3rem 5rem 3rem" }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h5"
          component="h5"
          sx={{ color: "var(--dark-blue)", fontWeight: 600 }}
        >
          PORTFOLIO
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          sx={{ color: "var(--gray)" }}
        >
          {monitoredStocksList.length} stocks monitored
        </Typography>
      </Stack>

      {monitoredStocksList.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "rgb(32 45 172 / 83%)" }}>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableCell
                    key={idx}
                    align="left"
                    sx={{ color: "whitesmoke" }}
                  >
                    <b>{header.toUpperCase()}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {monitoredStocksList.map((row) => (
                <TableRow
                  key={row.ticker}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/history/${row.ticker}`);
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ color: "var(--dark-blue)" }}
                  >
                    <b>{row.ticker}</b>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell align="left">{row.volume}</TableCell>
                  <TableCell align="left">{row.change}</TableCell>
                  <TableCell align="left">{row.lower_bound}</TableCell>
                  <TableCell align="left">{row.upper_bound}</TableCell>
                  <TableCell align="left">{row.close}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <FlexContainer
          flexDirection="column"
          sx={{
            padding: "4rem",
            backgroundColor: "var(--white)",
            height: "20rem",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ color: "var(--dark-blue)", fontWeight: "600", mb: 3 }}
          >
            No stocks on your portfolio yet
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
            Don't worry, we're here to help! Make sure to add some stocks to
            your portfolio and we'll keep you informed whenever the stock price
            crosses your upper or lower limit.
          </Typography>
        </FlexContainer>
      )}
    </Stack>
  );
}
