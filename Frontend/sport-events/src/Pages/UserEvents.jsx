import React, { useState } from "react";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function UserEvents() {
  let [data, setData] = useState([]);
  let userId = useSelector((store) => store.auth.user.data.id);

  useEffect(() => {
    const fetchData = async (url) => {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          setData(res.data.requestedEvents);
        });
    };

    fetchData(`https://sports-event-server.onrender.com/api/user/` + userId);
  }, []);
  console.log("data", data);

  return (
    <Box
      border="1px solid grey"
      borderRadius="8px"
      display="flex"
      gap="2"
      flexDirection="column"
      p="2"
      m="10"
    >
      <Heading>Players Request</Heading>
      <Box display="flex" justifyContent="space-between" m="2" p="2" mr="5">
        <Heading size="large">Event name</Heading>
        <Box display="flex" justifyContent="space-between" gap="10">
          <Heading size="large">Status </Heading>
        </Box>
      </Box>

      {data != null && (
        <Box
          display="flex"
          flexDirection="column"
          gap="2"
          m="2"
          p="2"
          border="1px solid grey"
          borderRadius="8px"
        >
          {data.map((event, index) => {
            return (
              event.players[0] !== undefined && (
                <Box key={index} display="flex" justifyContent="space-between">
                  <Box>{event.title}</Box>
                  <Box display="flex" gap="10">
                    {/* <Button bgColor="#00b562" color="white">
                    Accept
                  </Button> */}
                    <Button bgColor="#c68b80" color="white">
                      {event.players[0].requestStatus}
                    </Button>
                  </Box>
                </Box>
              )
            );
          })}
        </Box>
      )}
    </Box>
  );
}
