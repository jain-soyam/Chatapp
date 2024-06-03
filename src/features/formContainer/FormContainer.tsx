import { Box } from "@mui/material";
import { useFormContainerStyles } from "./FormContainer.Styles";
import { ReactNode } from "react";

export const FormContainer = ({ children }: { children: ReactNode }) => {
  const styles = useFormContainerStyles();
  return <Box sx={styles.formContainerStyles}>{children}</Box>;
};
