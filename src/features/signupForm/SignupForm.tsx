/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSignupFormStyles } from "./SignupForm.Styles";
import {
  Box,
  Grid,
  Stack,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import { ISignupForm } from "../../dto/SignupForm";

export const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const signupFormStyles = useSignupFormStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ISignupForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleUserSignup: SubmitHandler<ISignupForm> = (data: ISignupForm) => {
    console.log("data", data);
  };

  return (
    <Stack sx={signupFormStyles.getMainContStyles}>
      <form
        style={signupFormStyles.getFormStyles}
        onSubmit={handleSubmit(handleUserSignup)}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Stack sx={signupFormStyles.stackOneStyles}>
              <Typography sx={signupFormStyles.inputLabelStyles}>
                Email
              </Typography>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your email"
                    sx={{
                      "& .MuiInputBase-root": {
                        background: "whitesmoke",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "22.4px",
                        textAlign: "left",
                        borderRadius: "0.625rem",
                        "& fieldset": {
                          border: "none",
                        },
                        "&:hover fieldset": {
                          border: "none",
                        },
                        "&.MuiInputBase-root.Mui-focused fieldset": {
                          border: "1px solid #000",
                        },
                      },
                      "& .MuiFormLabel-root": {
                        fontSize: "1rem",
                      },
                    }}
                    type="email"
                    variant="outlined"
                  />
                )}
                rules={{
                  required: "Email is required",
                }}
              />
              <Typography
                variant="caption"
                sx={signupFormStyles.getErrorTextStyles(errors?.email)}
              >
                {errors?.email ? errors.email.message : ""}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack sx={signupFormStyles.stackOneStyles}>
              <Typography sx={signupFormStyles.inputLabelStyles}>
                Password*
              </Typography>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    placeholder="Create password*"
                    type={isPasswordVisible ? "text" : "password"}
                    {...field}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordVisibility}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {isPasswordVisible ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={signupFormStyles.getPasswordFieldStyles}
                  />
                )}
                rules={{
                  required: "Password is required",
                }}
              />
              <Typography
                variant="caption"
                sx={signupFormStyles.getErrorTextStyles(errors?.password)}
              >
                {errors?.password ? errors.password.message : ""}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box style={signupFormStyles.getButtonContStyles}>
              <Button
                type="submit"
                sx={signupFormStyles.getCommonButtonCustomStyles}
              >
                Signup
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};
