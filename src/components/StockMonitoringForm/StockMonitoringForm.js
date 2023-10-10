import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import FlexContainer from "../FlexContainer";
import FormErrorMessage from "../FormErrorMessage";
import { StockDetails } from "./StockMonitoringForm.styles";
import Loader from "../Loader/Loader";

const validateNumbersInput = (value) => {
  const numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    return "Please enter a valid number.";
  }

  if (numericValue <= 0) {
    return "Periodicity must be a positive number.";
  }

  return true;
};

export default function StockMonitoringForm({ setRefreshStockList }) {
  const [tickersList, setTickersList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [successFeedbackIsOpen, setSuccessFeedbackIsOpen] = useState(false);

  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!value)
      return setError(
        "Please, select a stock you would like to add to your monitoring wallet"
      );

    if (data.lowerBound >= data.upperBound)
      return setError("Lower bound must be a value lower than the upper bound");

    const payload = {
      ticker: value.ticker,
      name: value.name,
      lower_bound: data.lowerBound,
      upper_bound: data.upperBound,
      periodicity: data.periodicity,
      close: value.close,
      change: value.change,
      volume: value.volume,
    };

    const accessToken = localStorage.getItem("@investIQszA-token");

    const response = await axios.post(
      "/stock-monitoring/create",
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }
    );

    if (response.status !== 201) throw new Error(JSON.stringify(response));

    setRefreshStockList(true);
    setSuccessFeedbackIsOpen(true);
  };

  async function getTickersList() {
    try {
      const response = await axios.get("https://brapi.dev/api/quote/list", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data) {
        setTickersList(response.data.stocks);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTickersList();
  }, []);

  if (loading) {
    return <Loader gridArea="" />;
  }

  return (
    <Stack
      style={{
        backgroundColor: "whitesmoke",
        padding: "3rem",
        alignItems: "center",
        borderRadius: "3px",
        boxShadow: "0 0 5px 2px rgba(0,0,0,0.2)",
      }}
      spacing={5}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{ color: "var(--dark-blue)", fontWeight: "700" }}
      >
        Add New Stocks to Your Portfolio
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ width: 350 }}>
          {error && <FormErrorMessage message={error} />}

          <FormControl sx={{ m: 1.5 }} variant="filled">
            <Autocomplete
              freeSolo
              {...register("x")}
              options={tickersList}
              getOptionLabel={(option) => (option.stock ? option.stock : "")}
              value={
                value
                  ? tickersList.find(
                      (options) => value.ticker === options.stock
                    )
                  : null
              }
              onChange={(_, newValue) => {
                setValue(
                  newValue
                    ? {
                        name: newValue.name,
                        ticker: newValue.stock,
                        close: newValue.close,
                        change: newValue.change,
                        volume: newValue.volume,
                      }
                    : null
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Stock Ticker" />
              )}
            />
          </FormControl>

          {value && (
            <StockDetails>
              <p>
                <b>Close</b> {value.close} <b>Change</b> {value.change}
              </p>

              <p>
                <b>Volume</b> {value.volume}
              </p>
            </StockDetails>
          )}

          <FlexContainer>
            <FlexContainer flexDirection="column">
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: validateNumbersInput,
                }}
                render={({ field }) => (
                  <FormControl sx={{ mr: 1 }} variant="filled">
                    <InputLabel htmlFor="lowerBound">Lower Bound</InputLabel>
                    <OutlinedInput
                      id="lowerBound"
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      {...field}
                    />
                  </FormControl>
                )}
                name="lowerBound"
              />
              {errors.lowerBound && (
                <FormErrorMessage message={errors.lowerBound.message} />
              )}
            </FlexContainer>

            <FlexContainer flexDirection="column">
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: validateNumbersInput,
                }}
                render={({ field }) => (
                  <FormControl variant="filled">
                    <InputLabel htmlFor="upperBound">Upper Bound</InputLabel>
                    <OutlinedInput
                      id="upperBound"
                      type="number"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      {...field}
                    />
                  </FormControl>
                )}
                name="upperBound"
              />
              {errors.upperBound && (
                <FormErrorMessage message={errors.upperBound.message} />
              )}
            </FlexContainer>
          </FlexContainer>

          <Controller
            control={control}
            rules={{
              required: true,
              validate: validateNumbersInput,
            }}
            render={({ field }) => (
              <FormControl sx={{ m: 1.5 }} variant="filled">
                <InputLabel htmlFor="periodicity">
                  Periodicity (in minutes)
                </InputLabel>
                <Input
                  type="number"
                  renderInput={(params) => (
                    <TextField {...params} label="Periodicity " />
                  )}
                  {...field}
                />
              </FormControl>
            )}
            name="periodicity"
          />
          {errors.periodicity && (
            <FormErrorMessage message={errors.periodicity.message} />
          )}

          <Button
            type="submit"
            variant="contained"
            style={{
              width: "100%",
              marginTop: "2rem",
              backgroundColor: "var(--blue)",
            }}
          >
            Start Tracking
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={successFeedbackIsOpen}
        onClose={() => setSuccessFeedbackIsOpen(false)}
        autoHideDuration={6000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Stock added to your tracking portfolio!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
