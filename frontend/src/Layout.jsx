import { Box, Divider, Typography } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "primary.contrastText",
          fontWeight: 600,
          paddingX: "20px",
          paddingTop: "11px",
        }}
      >
        NOTES
      </Typography>
      <Divider />
      {children}
    </Box>
  );
};

export default Layout;
