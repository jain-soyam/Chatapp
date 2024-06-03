import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

export const Layout = () => {
  return (
    <>
      {/* <Box sx={{}}>Header</Box> */}
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 1.8rem",
        }}
      >
        <Box width="100%">
          <Outlet />
        </Box>
      </Stack>
    </>
  );
};
