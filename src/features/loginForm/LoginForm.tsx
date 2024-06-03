/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSignupFormStyles } from "../signupForm/SignupForm.Styles";
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
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/google-logo.png";

export const LoginForm = () => {
  const auth = getAuth(app);
  auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const signupFormStyles = useSignupFormStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ISignupForm>({
    defaultValues: {
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

  const handleUserLogin: SubmitHandler<ISignupForm> = async (
    data: ISignupForm
  ) => {
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        localStorage.setItem("accessToken", user.accessToken);
        reset();
        navigate("/chat");
      })
      .catch((error) => {
        return error;
      });
  };

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("accessToken", token);
        navigate("/chat");
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <Stack sx={signupFormStyles.getMainContStyles}>
      <form
        style={signupFormStyles.getFormStyles}
        onSubmit={handleSubmit(handleUserLogin)}
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
                    placeholder="Enter your email*"
                    sx={signupFormStyles.textFieldStyles}
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
                    placeholder="Enter your password*"
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
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Box
        sx={signupFormStyles.googleButtonContStyles}
        onClick={handleLoginWithGoogle}
      >
        <img
          src={GoogleLogo}
          alt="google_logo"
          style={signupFormStyles.googleLogoStyles}
        />
        <Typography sx={signupFormStyles.googleButtonTextStyles}>
          Signin with Google
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography sx={signupFormStyles.getActionTextOneStyles}>
          Don't have an account?
        </Typography>
        <Link to="/" style={signupFormStyles.getLinkStyles}>
          &nbsp;Signup
        </Link>
      </Box>
    </Stack>
  );
};
