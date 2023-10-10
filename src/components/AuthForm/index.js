import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  FormControl,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import axios from "axios";
import { Context } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthForm({ isSignUp = true }) {
  const { handleAuth } = useContext(Context);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isSignUp) {
      try {
        const response = await axios.post("/accounts/register", {
          email: data.email,
          password: data.password,
          fullName: data.fullName,
        });

        if (response.status === 201) {
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await axios.post("/api/token/", {
          email: data.email,
          password: data.password,
        });

        if (response.data) {
          handleAuth(response.data.access);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ width: 350 }}>
        {isSignUp && (
          <>
            <Controller
              control={control}
              rules={{
                required:
                  "Please, for compliance reasons, provide us your full name.",
              }}
              render={({ field }) => (
                <FormControl sx={{ m: 2 }} variant="filled">
                  <InputLabel htmlFor="fullName">Full Name</InputLabel>
                  <Input
                    type="text"
                    renderInput={(params) => (
                      <TextField {...params} label="First Name" />
                    )}
                    {...field}
                  />
                </FormControl>
              )}
              name="fullName"
            />
            {errors.fullName && <span>{errors.fullName.message}</span>}
          </>
        )}

        <Controller
          control={control}
          rules={{
            required: "Please, use your email to login.",
          }}
          render={({ field }) => (
            <FormControl sx={{ mr: 1 }} variant="filled">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                type="email"
                renderInput={(params) => (
                  <TextField {...params} label="Email" />
                )}
                {...field}
              />
            </FormControl>
          )}
          name="email"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <Controller
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <FormControl sx={{ m: 1.5 }} variant="filled">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                renderInput={(params) => (
                  <TextField {...params} label="Password" />
                )}
                {...field}
              />
            </FormControl>
          )}
          name="password"
        />
        {errors.password && <span>{errors.password.message}</span>}

        {isSignUp && (
          <>
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                validate: (value) => {
                  if (watch("password") !== value)
                    return "Passwords do not match.";
                },
              }}
              render={({ field }) => (
                <FormControl sx={{ m: 1.5 }} variant="filled">
                  <InputLabel htmlFor="passwordConfirmation">
                    Password Confirmation
                  </InputLabel>
                  <Input
                    type="password"
                    renderInput={(params) => (
                      <TextField {...params} label="Password Confirmation" />
                    )}
                    {...field}
                  />
                </FormControl>
              )}
              name="passwordConfirmation"
            />
            {errors.passwordConfirmation && (
              <span>{errors.passwordConfirmation.message}</span>
            )}
          </>
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
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
      </Stack>
    </form>
  );
}

export default AuthForm;
