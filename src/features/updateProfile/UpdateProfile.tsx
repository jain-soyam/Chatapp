import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, Grid, Stack, Typography, TextField, Button } from "@mui/material";
import { getAuth, updateProfile } from "firebase/auth";
import { useSignupFormStyles } from "../signupForm/SignupForm.Styles";

interface IUpdateProfileForm {
  name: string;
}

const UpdateProfileForm: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const signupFormStyles = useSignupFormStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IUpdateProfileForm>({
    defaultValues: {
      name: user?.displayName || "",
    },
    mode: "onChange",
  });

  const handleUpdateProfile: SubmitHandler<IUpdateProfileForm> = async (
    data: IUpdateProfileForm
  ) => {
    if (user) {
      const { name } = data;
      try {
        if (name && name !== user.displayName) {
          await updateProfile(user, { displayName: name });
          reset();
          alert("Profile updated successfully");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    }
  };

  return (
    <form
      style={signupFormStyles.getFormStyles}
      onSubmit={handleSubmit(handleUpdateProfile)}
    >
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Stack sx={signupFormStyles.stackOneStyles}>
            <Typography sx={signupFormStyles.inputLabelStyles}>Name</Typography>
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
  );
};

export default UpdateProfileForm;
