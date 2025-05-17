import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/home";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
