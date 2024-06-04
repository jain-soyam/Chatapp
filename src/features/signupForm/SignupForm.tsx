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
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = () => {
  const auth = getAuth(app);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const signupFormStyles = useSignupFormStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ISignupForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleUserSignup: SubmitHandler<ISignupForm> = async (
    data: ISignupForm
  ) => {
    const { name, email, password } = data;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name })
          .then(() => {
            reset();
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        return error;
      });
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
                Name
              </Typography>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your name*"
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
                    type="text"
                    variant="outlined"
                  />
                )}
                rules={{
                  required: "Name is required",
                }}
              />
              <Typography
                variant="caption"
                sx={signupFormStyles.getErrorTextStyles(errors?.name)}
              >
                {errors?.name ? errors.name.message : ""}
              </Typography>
            </Stack>
          </Grid>
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
                    placeholder="Enter your email*"
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
      <Box sx={{ display: "flex" }}>
        <Typography sx={signupFormStyles.getActionTextOneStyles}>
          Already have an account?
        </Typography>
        <Link to="/login" style={signupFormStyles.getLinkStyles}>
          &nbsp;Login
        </Link>
      </Box>
    </Stack>
  );
};
