import "./App.css";
import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Alert,
  Link,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3002");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    console.log("button clicked");
    if (username === "" || room === "") {
      console.log("suppose alert");
      alert("Ensure both fields are filled in.");
    } else {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <Grid sx={{ background: "rgb(13, 28, 45)", height: "120vh" }}>
      {!showChat ? (
        <>
          <div className="logo-wrapper"></div>
          <h1 className="Homepage--title">Chatyr</h1>
          <img
            className="logo"
            src="/images/Chatyr_transparent.png"
            alt="chatter_logo"
            style={{ margin: "0 auto" }}
          />
          <h1 className="Homepage-second--title">
            Join a room to start chatting!
          </h1>
          <Stack direction="column" gap="1rem">
            <TextField
              placeholder="James.."
              sx={{
                border: "solid 2px green",
                width: "15rem",
                margin: "0 auto",
              }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              InputProps={{
                style: {
                  color: "white",
                  "::placeholder": {
                    color: "#ffffff",
                  },
                },
              }}
            />
            <TextField
              placeholder="Room ID..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              sx={{
                border: "solid 2px green",
                width: "15rem",
                margin: "0 auto",
              }}
              InputProps={{
                style: {
                  color: "white",
                  "::placeholder": {
                    color: "#ffffff",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              onClick={joinRoom}
              sx={{
                width: "15rem",
                height: "3rem",
                margin: "0 auto",
                background: "green",
              }}
            >
              Join Room
            </Button>
          </Stack>
        </>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </Grid>
  );
}

export default App;
