import { useMessageContainerStyles } from "./MessageContainer.Styles";
import { Paper, Typography, Box, Stack, Avatar } from "@mui/material";
import SenderProfileImage from "../../../assets/sender-profile-image.jpg";
import ReceiverProfileImage from "../../../assets/receiver-profile-image.jpg";

interface MessageProps {
  text: string;
  displayName: string;
  isCurrentUser: boolean;
}

export const MessageContainer = ({
  text,
  displayName,
  isCurrentUser,
}: MessageProps) => {
  const messageContStyles = useMessageContainerStyles();

  return (
    <Box sx={messageContStyles.boxOneStyles(isCurrentUser)}>
      <Paper sx={messageContStyles.paperOneStyles}>
        <Stack sx={messageContStyles.stackOneStyles}>
          <Avatar
            src={isCurrentUser ? SenderProfileImage : ReceiverProfileImage}
          />
          <Typography sx={messageContStyles.textThreeStyles}>09:00</Typography>
        </Stack>
        <Stack sx={messageContStyles.stackTwoStyles(isCurrentUser)}>
          <Typography
            variant="body2"
            sx={messageContStyles.textOneStyles(isCurrentUser)}
          >
            {displayName}
          </Typography>
          <Typography
            variant="body1"
            sx={messageContStyles.textTwoStyles(isCurrentUser)}
          >
            {text}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};
