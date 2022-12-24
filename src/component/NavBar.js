import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#ebebeb" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#5f5f5f", flexGrow: 1 }}
          >
            Gunawan Setia
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
