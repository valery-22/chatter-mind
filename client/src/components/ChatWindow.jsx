import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Fade,
  Tooltip,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api/chat/message";

// Helper for sentiment color/icon
const sentimentConfig = {
  POSITIVE: { color: "success", icon: <MoodIcon fontSize="inherit" /> },
  NEGATIVE: { color: "error", icon: <SentimentDissatisfiedIcon fontSize="inherit" /> },
  NEUTRAL: { color: "info", icon: <ForumOutlinedIcon fontSize="inherit" /> },
};

export default function ChatWindow() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm ChatterMind, your AI support assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState('');
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post(API_URL, { message: input, context, sessionId });
      setMessages(msgs => [
        ...msgs,
        userMsg,
        {
          text: res.data.reply,
          sender: 'bot',
          sentiment: res.data.sentiment,
          score: res.data.score
        }
      ]);
      setContext(ctx => ctx + ' ' + input);
    } catch (e) {
      setMessages(msgs => [
        ...msgs,
        userMsg,
        {
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: 'bot'
        }
      ]);
    }
    setLoading(false);
  };

  // Scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Enter key sends
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        background: "rgba(21,23,26,0.97)",
        borderRadius: 3,
        p: { xs: 1, sm: 3 },
        minHeight: 430,
        maxHeight: 520,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 14px 0 rgba(20,20,23,0.20)",
      }}
    >
      {/* Chat messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          mb: 2,
          pr: 1,
        }}
      >
        {messages.map((msg, i) => {
          const isUser = msg.sender === 'user';
          const sentiment = msg.sentiment ? (msg.sentiment.toUpperCase() || "NEUTRAL") : "NEUTRAL";
          return (
            <Stack
              key={i}
              direction="row"
              alignItems="flex-end"
              justifyContent={isUser ? "flex-end" : "flex-start"}
              spacing={2}
              mb={1.2}
            >
              {!isUser && (
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 38,
                    height: 38,
                    boxShadow: 2,
                  }}
                  alt="ChatterMind"
                >
                  <ForumOutlinedIcon fontSize="medium" />
                </Avatar>
              )}
              <Fade in>
                <Box
                  sx={{
                    bgcolor: isUser ? "primary.dark" : "grey.900",
                    color: isUser ? "grey.100" : "grey.200",
                    px: 2,
                    py: 1.1,
                    borderRadius: 2.5,
                    maxWidth: "74vw",
                    minWidth: 60,
                    boxShadow: isUser
                      ? "0 1px 8px 0 rgba(0,188,212,0.10)"
                      : "0 1px 7px 0 rgba(0,0,0,0.08)",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.06rem",
                      wordBreak: "break-word",
                      whiteSpace: "pre-line",
                      fontWeight: 400,
                    }}
                  >
                    {msg.text}
                  </Typography>
                  {msg.sender === "bot" && msg.sentiment && (
                    <Chip
                      size="small"
                      icon={sentimentConfig[sentiment]?.icon}
                      label={sentiment.charAt(0) + sentiment.slice(1).toLowerCase()}
                      color={sentimentConfig[sentiment]?.color || "info"}
                      sx={{
                        position: "absolute",
                        right: 6,
                        bottom: -22,
                        fontSize: 12,
                        letterSpacing: 0.4,
                        borderRadius: 1,
                        opacity: 0.72,
                        boxShadow: "0 1px 4px #00606420",
                      }}
                    />
                  )}
                </Box>
              </Fade>
              {isUser && (
                <Avatar
                  sx={{
                    bgcolor: "grey.800",
                    color: "primary.light",
                    width: 38,
                    height: 38,
                    boxShadow: 2,
                  }}
                  alt="You"
                >
                  <PersonIcon fontSize="medium" />
                </Avatar>
              )}
            </Stack>
          );
        })}
        {/* Loading animation */}
        {loading && (
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} mt={1}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 38,
                height: 38,
              }}
            >
              <ForumOutlinedIcon />
            </Avatar>
            <CircularProgress size={26} thickness={5} color="primary" />
          </Stack>
        )}
        <div ref={chatEndRef} />
      </Box>
      {/* Input area */}
      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <TextField
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          variant="outlined"
          placeholder="Type your message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            bgcolor: "#23252A",
            borderRadius: 2,
            input: { color: "grey.200" },
            textarea: { color: "grey.200" },
          }}
          disabled={loading}
        />
        <Tooltip title="Send">
          <span>
            <Button
              onClick={sendMessage}
              variant="contained"
              color="primary"
              disabled={loading || !input.trim()}
              sx={{
                minWidth: 44,
                minHeight: 44,
                borderRadius: 2,
                boxShadow: "0 2px 6px #00bcd433",
                px: 0,
                py: 0,
              }}
            >
              <SendIcon />
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </Paper>
  );
}
