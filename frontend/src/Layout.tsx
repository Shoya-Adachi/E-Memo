import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./components/sidebar/sidebar";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      {children}
    </Box>
  );
};

export default Layout;
