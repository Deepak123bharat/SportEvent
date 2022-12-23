import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Box } from "@chakra-ui/react";
import { Route, Routes, Router } from "react-router-dom";
import Home from "./Pages/Home";
import AllRoutes from "./Components/AllRoutes";

function App() {
  return (
    <Box>
      <AllRoutes />
    </Box>
  );
}

export default App;
