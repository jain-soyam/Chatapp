import React from "react";
import { Paper, Typography, Box } from "@mui/material";

interface MessageProps {
  text: string;
  displayName: string;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({
  text,
  displayName,
  isCurrentUser,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isCurrentUser ? "flex-end" : "flex-start",
        marginBottom: 2,
      }}
    >
      <Paper
        sx={{
          padding: 1,
          backgroundColor: isCurrentUser ? "#dcf8c6" : "#c1e0c9",
          maxWidth: "80%",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: isCurrentUser ? "#1a1a1a" : "#4a4a4a",
            fontWeight: "bold",
            marginBottom: 0.5,
          }}
        >
          {displayName}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#333",
          }}
        >
          {text}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Message;
