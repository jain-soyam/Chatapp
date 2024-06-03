import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import SignupForm from "../features/signupForm";
import { Box } from "@mui/material";

const Routes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                position: "absolute",
                top: "0vh",
                left: "0vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overlay: "auto",
              }}
            >
              <SignupForm />
            </Box>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Routes;
