/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  TextField,
  Box,
  Paper,
  Typography,
  // IconButton,
  Fab,
  Stack,
  Avatar,
} from "@mui/material";
import { firestore } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Send } from "@mui/icons-material";
import MessageContainer from "../messageContainer";
import SenderProfileImage from "../../../assets/sender-profile-image.jpg";
import { useChatRoomStyles } from "./ChatRoom.Styles";
import { useNavigate } from "react-router-dom";

interface MessageType {
  id: string;
  text: string;
  displayName: string;
  uid: string;
}

export const ChatRoom = () => {
  const chatRoomStyles = useChatRoomStyles();
  const auth = getAuth();
  const user = auth.currentUser;
  const [messages, setMessages] = useState<MessageType[] | any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const queryMessage = query(messageRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  const messageRef = collection(firestore, "messages");
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const displayName = user?.displayName;
    const uid = user?.uid;
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      displayName,
      uid,
    });
    setNewMessage("");
  };

  const toggleUpdateProfile = () => {
    navigate("/profile");
  };

  return (
    <Stack sx={chatRoomStyles.stackOneStyles}>
      {user ? (
        <Stack sx={chatRoomStyles.stackTwoStyles}>
          <Avatar
            src={SenderProfileImage}
            sx={chatRoomStyles.avatarOneStyles}
            onClick={toggleUpdateProfile}
          />
          <Typography variant="h5" sx={chatRoomStyles.textOneStyles}>
            {user.displayName}
          </Typography>
        </Stack>
      ) : (
        <Typography variant="body1">Loading user data...</Typography>
      )}
      <Stack sx={chatRoomStyles.stackThreeStyles}>
        <Paper className="messages" sx={chatRoomStyles.paperOneStyles}>
          {messages.map((message: any) => (
            <MessageContainer
              key={message.id}
              text={message.text}
              displayName={message.displayName}
              isCurrentUser={message.uid === user?.uid}
            />
          ))}
        </Paper>
        <form onSubmit={handleSendMessage}>
          <Box sx={chatRoomStyles.boxOneStyles}>
            <TextField
              fullWidth
              variant="outlined"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              sx={chatRoomStyles.textfieldOneStyles}
              multiline
              maxRows={2}
            />
            <Fab type="submit" color="inherit" sx={chatRoomStyles.fabOneStyles}>
              <Send sx={chatRoomStyles.iconOneStyles} />
            </Fab>
          </Box>
        </form>
      </Stack>
    </Stack>
  );
};
