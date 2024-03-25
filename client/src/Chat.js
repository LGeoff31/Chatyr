import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Button, TextField, Stack, Grid, Box, Typography } from "@mui/material";
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]); //whatever list before then at end add new
    });
  }, [socket]);

  return (
    <Grid
      container
      direction="column"
      paddingTop="10rem"
      display="flex"
      justifyContent={"center"}
      alignContent={"center"}
      sx={{
        color: "#212121",
        fontFamily: "Open Sans, sans-serif",
        margin: 0,
        padding: 0,
      }}
    >
      {/* <div className="chat-window"> */}
      <Box sx={{ background: "#263238", borderRadius: "0.1rem" }}>
        <Typography
          sx={{
            paddingLeft: "1rem",
            paddingRight: "1rem",

            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            color: "white",
            ontWeight: "bold",
            variant: "h3",
            fontSize: "2rem",
          }}
        >
          Live Chat #{room}
        </Typography>
      </Box>
      <Box
        sx={{
          background: "white",
          paddingLeft: "1rem",
          paddingTop: "1rem",
          // height: "50%",
        }}
      >
        <ScrollToBottom>
          {messageList.map((messageContent, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    username === messageContent.author
                      ? "flex-start"
                      : "flex-end",
                  marginBottom: "0.5rem",
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      username === messageContent.author
                        ? "#43a047"
                        : "cornflowerblue",
                    borderRadius: "5px",
                    color: "white",
                    maxWidth: "120px",
                    padding: "5px",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography fontSize="2rem">
                    {messageContent.message}
                  </Typography>
                </Box>
                <Stack direction="row" gap="0.5rem" sx={{ fontSize: "1rem" }}>
                  <Typography>{messageContent.time}</Typography>
                  <Typography marginBottom="2rem">
                    {messageContent.author}
                  </Typography>
                </Stack>
              </Box>
            );

            {
            }
          })}
        </ScrollToBottom>

        <div className="chat-footer">
          <TextField
            sx={{ paddingBottom: "3rem" }}
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <Button onClick={sendMessage} sx={{ fontSize: "1.5rem" }}>
            &#9658;{" "}
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default Chat;
