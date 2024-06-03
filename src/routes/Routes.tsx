import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import SignupForm from "../features/signupForm";
import LoginForm from "../features/loginForm";
import FormContainer from "../features/formContainer";

const Routes = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <FormContainer>
              <SignupForm />
            </FormContainer>
          ),
        },
        {
          path: "/login",
          element: (
            <FormContainer>
              <LoginForm />
            </FormContainer>
          ),
        },
        {
          path: "/chat",
          element: <>This is chat page</>,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Routes;
