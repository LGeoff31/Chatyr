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
    socket.on("receive_message", (data) => {
      console.log("ran");
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
        sx={{ background: "white", paddingLeft: "1rem", paddingTop: "1rem" }}
      >
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent, idx) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <Typography fontSize="2rem">
                        {messageContent.message}{" "}
                      </Typography>
                    </div>
                    <div className="message-meta">
                      <Stack direction="row" gap="0.5rem">
                        <Typography fontSize={"1rem"}>
                          {messageContent.time}{" "}
                        </Typography>
                        <Typography fontSize={"1rem"} marginBottom="2rem">
                          {messageContent.author}{" "}
                        </Typography>
                      </Stack>
                    </div>
                  </div>
                </div>
              );

              {
              }
            })}
          </ScrollToBottom>
        </div>
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
        {/* </div> */}
      </Box>
    </Grid>
  );
};

export default Chat;
