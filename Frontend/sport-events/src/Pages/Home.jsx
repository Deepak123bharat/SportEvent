import {
  Card,
  Image,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
  CardFooter,
  Box,
  Center,
  chakra,
  Spinner,
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  FaSearch,
  FaStar,
  FaSquare,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const CFaSearch = chakra(FaSearch);
const CFaStar = chakra(FaStar);
const CFaSquare = chakra(FaSquare);
const CFaChevronDown = chakra(FaChevronDown);
const CFaChevronUp = chakra(FaChevronUp);

export default function Home() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [sortRating, setSortRating] = useState(0);
  const [url, setUrl] = useState(
    "https://sports-event-server.onrender.com/api/event/"
  );
  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleShowFilter = () => setShowFilter(!showFilter);

  const handleInputSearch = (search) => {
    setUrl(
      `https://sports-event-server.onrender.com/api/event?search=${search}`
    );
  };
  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setAllData(data.data.events);
          setLoading(false);
        });
    };

    fetchData(url);
  }, [url]);

  const onCheckBoxChange = () => {
    if (
      checkedItems[0] === true ||
      checkedItems[1] === true ||
      checkedItems[2] === true ||
      checkedItems[3] === true ||
      checkedItems[4] === true
    ) {
      let urlForFilter =
        "https://sports-event-server.onrender.com/api/event?search=";
      console.log(checkedItems);
      if (checkedItems[4] === true) {
        urlForFilter += "2FSP5";
      } else if (checkedItems[3] === true) {
        urlForFilter += "2FSP66";
      } else if (checkedItems[2] === true) {
        urlForFilter += "2FSP4";
      } else if (checkedItems[1] === true) {
        urlForFilter += "2FSP57";
      } else if (checkedItems[0] === true) {
        urlForFilter += "2FSP56";
      }
      setUrl(urlForFilter);
      console.log("url", url, allData);
    } else {
      setUrl("https://sports-event-server.onrender.com/api/event/");
    }
  };

  return (
    <>
      <Box className="search-and-filter" ml="10" mb="5">
        <Box display="flex" gap="10px">
          <InputGroup width="40%">
            <InputLeftElement
              pointerEvents="none"
              children={<CFaSearch color="gray.300" />}
            />
            <Input
              type="email"
              name="email"
              placeholder="search by event tital"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleInputSearch(e.target.value);
                }
              }}
              // onChange={onInputChange}
            />
          </InputGroup>
          <Box
            width="25%"
            display="flex"
            alignItems="center"
            gap="10px"
            border="1px solid #dae3ed"
            borderRadius="8px"
            pl="3"
            pr="3"
            onClick={handleShowFilter}
          >
            <CFaSquare color="gray.300" />
            <Text>All Sports Filter</Text>
          </Box>

          <Box
            width="20%"
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            gap="10px"
            border="1px solid #dae3ed"
            borderRadius="8px"
            pl="3"
            pr="3"
          >
            <CFaStar color="gray.300" />

            <Text>Rating</Text>
            <Button
              border="1px solid #dae3ed"
              borderRadius="8px"
              p="1"
              value="2"
              onClick={(e) => {
                setUrl(
                  `https://sports-event-server.onrender.com/api/event?sortBy=rating&sortOrder=asc`
                );
              }}
              m="3px"
            >
              <CFaChevronUp color="gray.300" />
            </Button>
            <Button
              border="1px solid #dae3ed"
              p="1"
              value="1"
              onClick={(e) => {
                setUrl(
                  `https://sports-event-server.onrender.com/api/event?sortBy=rating&sortOrder=desc`
                );
              }}
              borderRadius="8px"
            >
              <CFaChevronDown color="gray.300" />
            </Button>
          </Box>
        </Box>
      </Box>
      {!showFilter && (
        <Box
          position="sticky"
          zIndex="3"
          display="flex"
          flexDirection="column"
          gap="5px"
          backgroundColor="White"
          ml="40%"
          w="30%"
          mr="20%"
          p="10px"
          mt="-3"
          border="1px solid #dae3ed"
          borderRadius="8px"
          mb="-120px"
          // onClick={onCheckBoxChange}
        >
          <Checkbox
            onChange={(e) => {
              setCheckedItems([
                checkedItems[0],
                e.target.checked,
                checkedItems[2],
                checkedItems[3],
                checkedItems[4],
              ]);
              onCheckBoxChange();
            }}
          >
            Cricket Net
          </Checkbox>
          <Checkbox
            onChange={(e) => {
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                e.target.checked,
                checkedItems[3],
                checkedItems[4],
              ]);
              onCheckBoxChange();
            }}
          >
            Bowling Machine
          </Checkbox>
          <Checkbox
            onChange={(e) => {
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                checkedItems[2],
                e.target.checked,
                checkedItems[4],
              ]);
              onCheckBoxChange();
            }}
          >
            Tennis
          </Checkbox>
          <Checkbox
            onChangeCapture={onCheckBoxChange}
            onChange={(e) => {
              setCheckedItems([
                checkedItems[0],
                checkedItems[1],
                checkedItems[2],
                checkedItems[3],
                e.target.checked,
              ]);
            }}
          >
            Badminton
          </Checkbox>
        </Box>
      )}
      {loading && (
        <Box>
          {" "}
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              marginTop="20%"
            />
          </Center>{" "}
        </Box>
      )}
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={4}
      >
        {allData.map((event) => (
          <Box key={uuidv4()} className="card" maxW="sm" m="3" ml="10">
            <Link to={"/event/" + event._id}>
              <Card>
                <Image
                  src={event.image}
                  alt="Green double couch with wooden legs"
                />
                <Stack mt="6" m="2">
                  <Box display="flex" justifyContent="space-between">
                    <Heading size="sm">{event.title}</Heading>
                    <Text display="flex">
                      <span className="star">&#9733;</span>
                      {event.rating}
                    </Text>
                  </Box>
                  <Text>{event.address}</Text>
                  <Text display="flex">
                    {event.icons.map((ic) => {
                      return <img width="25px" src={ic}></img>;
                    })}
                  </Text>
                </Stack>
              </Card>
            </Link>
          </Box>
        ))}
      </Grid>
    </>
  );
}
