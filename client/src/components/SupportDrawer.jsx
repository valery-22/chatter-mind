import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function SupportDrawer() {
  const [open, setOpen] = useState(false);

  const handleDrawer = (state) => () => setOpen(state);

  return (
    <>
      <IconButton
        color="primary"
        size="large"
        onClick={handleDrawer(true)}
        sx={{
          bgcolor: "rgba(0,188,212,0.08)",
          borderRadius: 2,
          boxShadow: "0 2px 8px #00bcd41a",
          "&:hover": {
            bgcolor: "rgba(0,188,212,0.16)",
          },
        }}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "90vw", sm: 400 },
            bgcolor: "#202328",
            color: "#d7f6f6",
            boxShadow: "0 4px 32px 0 #00bcd433",
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <ForumOutlinedIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight={800} color="primary.main">
              ChatterMind Support
            </Typography>
          </Stack>
          <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 2 }}>
            Get help, learn about ChatterMind, and reach support.
          </Typography>
          <Divider sx={{ my: 2, opacity: 0.12 }} />

          <List>
            <ListItem>
              <ListItemIcon>
                <InfoOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="About ChatterMind"
                secondary="AI-powered chatbot for smart, sentiment-aware customer support."
                primaryTypographyProps={{
                  color: "grey.100",
                  fontWeight: 600,
                }}
                secondaryTypographyProps={{
                  color: "grey.400",
                  fontSize: 13,
                  mt: 0.3,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ContactSupportIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="How does it work?"
                secondary="ChatterMind uses OpenAI and custom NLP to understand your questions, mood, and context to deliver the best help."
                primaryTypographyProps={{
                  color: "grey.100",
                  fontWeight: 600,
                }}
                secondaryTypographyProps={{
                  color: "grey.400",
                  fontSize: 13,
                  mt: 0.3,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ForumOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="FAQ"
                secondary={
                  <ul style={{ margin: 0, paddingLeft: 15, color: "#d7f6f6" }}>
                    <li>Is my data private? <span style={{ color: "#80cbc4" }}>Yes, it is never shared.</span></li>
                    <li>Can I get a human agent? <span style={{ color: "#80cbc4" }}>Coming soon!</span></li>
                    <li>What can I ask? <span style={{ color: "#80cbc4" }}>Anything about your account, orders, or general support.</span></li>
                  </ul>
                }
                primaryTypographyProps={{
                  color: "grey.100",
                  fontWeight: 600,
                }}
                secondaryTypographyProps={{
                  color: "grey.400",
                  fontSize: 13,
                  mt: 0.3,
                }}
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 3, opacity: 0.1 }} />

          <Alert severity="info" sx={{ mb: 2, bgcolor: "#223", color: "#b2ebf2" }}>
            This is a demo. For urgent issues, please contact a real support agent.
          </Alert>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<OpenInNewIcon />}
            href="https://github.com/your-github/chattermind"
            target="_blank"
            rel="noopener"
            sx={{
              fontWeight: 700,
              letterSpacing: 1.1,
              mt: 2,
              borderRadius: 2,
              boxShadow: "0 2px 8px #00bcd433",
            }}
          >
            Visit Project on GitHub
          </Button>
        </Box>
      </Drawer>
    </>
  );
}