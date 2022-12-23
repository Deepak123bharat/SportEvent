import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../Redux/Features/authSlice";
import { getEvent, updateEvent } from "../Redux/Features/eventSlice";

export default function SingleEvent() {
  const dispatch = useDispatch();
  let [data, setData] = useState([]);
  let { id } = useParams();
  let userId = useSelector((store) => store.auth.user.data.id);
  let storeUser = useSelector((store) => store.auth.user.data);
  let userName = useSelector((store) => store.auth.user.data.name);
  // const [requestedPlayers, setPlayers] = useState([]);
  useEffect(() => {
    const fetchData = async (url) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    };

    fetchData(`https://sports-event-server.onrender.com/api/event/` + id);
  }, []);

  let date = new Date(data.timming);

  return (
    <Box
      m="10"
      width="90vw"
      display="flex"
      justifyContent="space-evenly"
      gap="10"
    >
      <Box display="flex" gap="5" flexDirection="column">
        <Heading>{data.title}</Heading>
        <Box display="flex" gap="10">
          <Text>{data.address}</Text>
          <Text>
            <span className="star">&#9733;</span>
            {data.rating}
          </Text>
        </Box>
        <Box>
          <Image src={data.image} alt="Green double couch with wooden legs" />
        </Box>
        <Box border="1px solid grey" borderRadius="8px" p="3">
          <Text fontSize="large">
            Sports Available (Click on sports to view price chart)
          </Text>
          <Box display="flex" gap="2">
            {data.icons != null &&
              data.icons.map((icon) => {
                return (
                  <Box
                    width="100px"
                    height="100px"
                    border="1px solid grey"
                    borderRadius="8px"
                  >
                    <Image
                      src={icon}
                      alt="Green double couch with wooden legs"
                    />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="10" mt="10px">
        <Box display="flex" gap="10">
          {data.players != null && data.players.length < data.playerLimit ? (
            <Button
              background="#00b562"
              color="white"
              onClick={() => {
                //   data.rating = 5;
                let requestStatus = "Pending";
                let currentUser = { userName, userId, requestStatus };
                data.players.push(currentUser);
                // console.log("data", data);
                setData({ ...data });
                dispatch(updateEvent({ id: data._id, data }));
                dispatch(updateUser({ id: data._id, userId }));
                //   window.location.reload(false);
              }}
            >
              Book Event
            </Button>
          ) : (
            <Button background="#00b562" color="white">
              Player limit reached
            </Button>
          )}

          <Button background="whitle" border="1px solid grey">
            Share
          </Button>
        </Box>
        <Box
          border="1px solid grey"
          borderRadius="8px"
          display="flex"
          gap="2"
          p="2"
          flexDirection="column"
        >
          <Heading size="large">Timming</Heading>

          <Box>
            {date.getDay()}/{date.getMonth()}/{date.getFullYear()}{" "}
            {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
          </Box>
        </Box>
        <Box
          border="1px solid grey"
          borderRadius="8px"
          display="flex"
          gap="2"
          flexDirection="column"
          p="2"
        >
          <Heading size="large">Location</Heading>
          <Box>{data.address}</Box>
        </Box>
        <Box
          border="1px solid grey"
          borderRadius="8px"
          display="flex"
          gap="2"
          flexDirection="column"
          p="2"
        >
          <Heading size="large">Duration</Heading>
          <Box>{data.duration} Hours</Box>
        </Box>
        <Box
          border="1px solid grey"
          borderRadius="8px"
          display="flex"
          gap="2"
          flexDirection="column"
          p="2"
        >
          <Heading size="large">Player Limit</Heading>
          <Box>
            {data.players != null ? data.players.length : 0}/{data.playerLimit}
          </Box>
        </Box>
        <Box
          border="1px solid grey"
          borderRadius="8px"
          display="flex"
          gap="2"
          flexDirection="column"
          p="2"
        >
          <Heading>Players Request</Heading>
          {data.players != null && data.players.length > 0 && (
            <Box display="flex" flexDirection="column" gap="2">
              {data.players.map((user, index) => {
                return (
                  user != null && (
                    <Box display="flex" justifyContent="space-between">
                      <Box>{user.userName}</Box>
                      <Box display="flex" gap="2">
                        <Button
                          bgColor="#00b562"
                          color="white"
                          onClick={() => {
                            data.players[index].requestStatus = "Accepted";
                            delete data.players[index];
                            data.players = data.players.filter((a) => a);
                            dispatch(updateEvent({ id: data._id, data }));
                            setData({ ...data });
                          }}
                          //   disabled="data.players[index].requestStatus === Accepted"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => {
                            delete data.players[index];
                            data.players = data.players.filter((a) => a);
                            dispatch(updateEvent({ id: data._id, data }));
                            setData({ ...data });
                            // window.location.reload(false);
                          }}
                          bgColor="#ff6347"
                          color="white"
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  )
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
