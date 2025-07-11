import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Stack,
  Link as MuiLink
} from '@mui/material';
import ChatWindow from './components/ChatWindow';
import SupportDrawer from './components/SupportDrawer';
import darkTheme from './styles/theme';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { blue, teal } from '@mui/material/colors';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          background: 'rgba(24,25,26,0.85)',
          backdropFilter: 'blur(7px)',
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              sx={{
                bgcolor: teal[400],
                width: 40,
                height: 40,
                mr: 1,
                fontSize: 28,
                boxShadow: 2,
              }}
              variant="rounded"
            >
              <ForumOutlinedIcon fontSize="inherit" />
            </Avatar>
            <Typography
              variant="h6"
              color={teal[200]}
              fontWeight={700}
              letterSpacing={1.1}
              sx={{
                textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                userSelect: 'none',
              }}
            >
              ChatterMind
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="About">
              <IconButton color="primary">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub Repository">
              <IconButton
                component={MuiLink}
                href="https://github.com/your-github/chattermind"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* Spacer for AppBar */}

      <Box
        minHeight="100vh"
        sx={{
          background: `radial-gradient(ellipse at top right, ${blue[900]} 0%, #18191A 80%)`,
          pt: 5,
          pb: 7,
          px: 1,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={10}
            sx={{
              borderRadius: 5,
              p: { xs: 2, sm: 4 },
              mt: 6,
              background: 'rgba(27, 29, 34, 0.98)',
              boxShadow: '0 4px 32px 0 rgba(0,0,0,0.27)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Title Section */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
              mb={2}
            >
              <Box>
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight={900}
                  gutterBottom
                  sx={{ letterSpacing: 2, textShadow: "0 4px 14px #00606422" }}
                >
                  ChatterMind
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="grey.300"
                  fontWeight={400}
                  sx={{ maxWidth: 520 }}
                >
                  AI-powered Contextual Customer Support Chatbot <br />
                  <span style={{ color: teal[300], fontWeight: 500 }}>
                    Understands mood, context, and escalates complex issues.
                  </span>
                </Typography>
              </Box>
              <SupportDrawer />
            </Stack>

            <Divider sx={{ mb: 3, opacity: 0.12 }} />

            {/* Chat Window */}
            <ChatWindow />

            {/* Footer */}
            <Divider sx={{ mt: 5, mb: 1, opacity: 0.10 }} />
            <Box mt={3} textAlign="center">
              <Typography
                variant="caption"
                color="grey.500"
                sx={{ letterSpacing: 1.1 }}
              >
                © {new Date().getFullYear()} ChatterMind | AI Customer Support Demo
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;