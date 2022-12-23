import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddEditEvent from "../Pages/AddEditEvent";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFoundPage from "../Pages/NotFoundPage";
import Register from "../Pages/Register";
import SingleEvent from "../Pages/SingleEvent";
import UserEvents from "../Pages/UserEvents";
import Navbar from "./Navbar";
import Privateroute from "./Privateroute";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ margin: "auto" }}>
        <ToastContainer />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/search" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/addevent"
          element={
            <Privateroute>
              <AddEditEvent />
            </Privateroute>
          }
        />
        <Route
          path="/userevents"
          element={
            <Privateroute>
              <UserEvents />
            </Privateroute>
          }
        />
        <Route
          path="/editevent/:id"
          element={
            <Privateroute>
              <AddEditEvent />
            </Privateroute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <Privateroute>
              <SingleEvent />
            </Privateroute>
          }
        />
        <Route path="/event/:id" element={<SingleEvent />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
