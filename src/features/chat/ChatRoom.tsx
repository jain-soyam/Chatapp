import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Message from "./Message";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { firestore } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import UpdateProfileForm from "../updateProfile/UpdateProfile";
import { AccountCircle } from "@mui/icons-material";
interface MessageType {
  id: string;
  text: string;
  displayName: string;
  uid: string;
}

const ChatRoom = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

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
    setShowUpdateProfile(!showUpdateProfile);
  };
  return (
    <Box>
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Welcome, {user.displayName}</Typography>
          <IconButton onClick={toggleUpdateProfile}>
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="body1">Loading user data...</Typography>
      )}

      {showUpdateProfile && <UpdateProfileForm />}
      <Paper
        className="messages"
        sx={{ padding: 2, marginBottom: 2, height: "60vh", overflowY: "auto" }}
      >
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            displayName={message.displayName}
            isCurrentUser={message.uid === user?.uid}
          />
        ))}
      </Paper>
      <form onSubmit={handleSendMessage}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginLeft: 1 }}
          >
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChatRoom;
