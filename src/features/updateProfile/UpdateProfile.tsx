import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Box,
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  getAuth,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useSignupFormStyles } from "../signupForm/SignupForm.Styles";
import { useNavigate } from "react-router-dom";
import { useChatRoomStyles } from "../chat/chatRoom/ChatRoom.Styles";
import SenderProfileImage from "../../assets/sender-profile-image.jpg";

interface IUpdateProfileForm {
  name: string;
  password: string;
  photoURL: string;
  currentPassword: string;
}

const UpdateProfileForm: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || "");
  const signupFormStyles = useSignupFormStyles();
  const navigate = useNavigate();
  const chatRoomStyles = useChatRoomStyles();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IUpdateProfileForm>({
    defaultValues: {
      name: user?.displayName || "",
      password: "",
      photoURL: user?.photoURL || "",
      currentPassword: "",
    },
    mode: "onChange",
  });

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleCurrentPasswordVisibility = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const handleMouseDownPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const reauthenticate = async (currentPassword: string) => {
    if (user?.email && currentPassword) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
    }
  };

  const handleUpdateProfile: SubmitHandler<IUpdateProfileForm> = async (
    data: IUpdateProfileForm
  ) => {
    if (user) {
      const { name, password, photoURL, currentPassword } = data;
      try {
        await reauthenticate(currentPassword);

        if (name && name !== user.displayName) {
          await updateProfile(user, { displayName: name });
        }
        if (photoURL && photoURL !== user.photoURL) {
          await updateProfile(user, { photoURL: photoURL });
          setPhotoURL(photoURL);
        }
        if (password) {
          await updatePassword(user, password);
        }
        reset();
        alert("Profile updated successfully");
        navigate("/chat");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    }
  };

  return (
    <Stack style={signupFormStyles.getMainContStyles}>
      {user ? (
        <Stack sx={chatRoomStyles.stackTwoStyles}>
          <Avatar
            src={SenderProfileImage}
            sx={chatRoomStyles.avatarOneStyles}
          />
          <Typography variant="h5" sx={chatRoomStyles.textOneStyles}>
            {user.displayName}
          </Typography>
        </Stack>
      ) : (
        <Typography variant="body1">Loading user data...</Typography>
      )}
      <form
        style={signupFormStyles.getFormStyles}
        onSubmit={handleSubmit(handleUpdateProfile)}
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
                    sx={signupFormStyles.textFieldStyles}
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
                Photo URL
              </Typography>
              <Controller
                name="photoURL"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your photo URL"
                    sx={signupFormStyles.textFieldStyles}
                    type="text"
                    variant="outlined"
                    onChange={(e) => {
                      field.onChange(e);
                      setPhotoURL(e.target.value);
                    }}
                  />
                )}
              />
              <Typography
                variant="caption"
                sx={signupFormStyles.getErrorTextStyles(errors?.photoURL)}
              >
                {errors?.photoURL ? errors.photoURL.message : ""}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack sx={signupFormStyles.stackOneStyles}>
              <Typography sx={signupFormStyles.inputLabelStyles}>
                Current Password
              </Typography>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    placeholder="Enter current password*"
                    type={isCurrentPasswordVisible ? "text" : "password"}
                    {...field}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle current password visibility"
                          onClick={handleCurrentPasswordVisibility}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {isCurrentPasswordVisible ? (
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
                  required: "Current password is required",
                }}
              />
              <Typography
                variant="caption"
                sx={signupFormStyles.getErrorTextStyles(
                  errors?.currentPassword
                )}
              >
                {errors?.currentPassword ? errors.currentPassword.message : ""}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack sx={signupFormStyles.stackOneStyles}>
              <Typography sx={signupFormStyles.inputLabelStyles}>
                New Password
              </Typography>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    placeholder="Enter new password"
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
                Update Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};

export default UpdateProfileForm;
