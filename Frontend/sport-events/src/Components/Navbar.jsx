import { Box, Flex, Image, Text, Spacer, Show } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import React from "react";
import { GrCart } from "react-icons/gr";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../Redux/Features/authSlice";

const Navbar = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <>
      <HStack mb="15px" borderBottom="1px solid #dae3ed">
        <Flex w="100%" alignItems="center" justifyContent="space-between">
          <Box m="3" ml="10">
            <Link to="/">
              <Image
                src="https://playo-website.gumlet.io/playo-website-v2/Logo+with+Trademark_Filled.png"
                alt="logo"
                _hover={{ cursor: "pointer" }}
                w="100px"
              />
            </Link>
          </Box>
          <Box style={{ display: "flex", gap: "30px" }}>
            <Box>
              {" "}
              <Link to="/">
                <Text as="b" _hover={{ cursor: "pointer" }} color="tomato">
                  {" "}
                  Explore{" "}
                </Text>{" "}
              </Link>
            </Box>
            <Link to="/userevents">
              <Box>
                {" "}
                <Text as="b" _hover={{ color: "tomato", cursor: "pointer" }}>
                  {" "}
                  Accepted & requested events{" "}
                </Text>{" "}
              </Box>
            </Link>

            <Box>
              {" "}
              <Link to="/addevent">
                <Text as="b" _hover={{ color: "tomato", cursor: "pointer" }}>
                  {" "}
                  Add Event{" "}
                </Text>{" "}
              </Link>
            </Box>
            {user != null && user.data != null && user.data.token ? (
              <Box>
                <Text as="b" _hover={{ color: "tomato", cursor: "pointer" }}>
                  {" "}
                  {user.data.name}
                </Text>{" "}
                <Text
                  as="b"
                  _hover={{ color: "tomato", cursor: "pointer" }}
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  {" "}
                  Logout
                </Text>{" "}
              </Box>
            ) : (
              <Box style={{ display: "flex", gap: "10px" }}>
                {" "}
                <Link to="/login">
                  <Text as="b" _hover={{ color: "tomato", cursor: "pointer" }}>
                    {" "}
                    Login /{" "}
                  </Text>{" "}
                </Link>
                <Link to="/register">
                  <Text as="b" _hover={{ color: "tomato", cursor: "pointer" }}>
                    {" "}
                    Signup{" "}
                  </Text>{" "}
                </Link>
              </Box>
            )}

            <Box> </Box>
          </Box>
        </Flex>
      </HStack>
    </>
  );
};

export default Navbar;
