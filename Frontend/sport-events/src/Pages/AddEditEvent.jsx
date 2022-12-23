import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../Redux/Features/authSlice";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { createEvent } from "../Redux/Features/eventSlice";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

let initState = {
  title: "",
  description: "",
  image: "",
  playerLimit: "",
  timming: "",
  duration: "",
  address: "",
};

function AddEditEvent(props) {
  const [formValue, setFormValue] = useState(initState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    error &&
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("this is form value", formValue);
    dispatch(createEvent({ formValue, navigate, toast }));
  };

  const onInputChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
      }}
    >
      <FormControl
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit}
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={8}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <InputGroup>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Player limit"
                    size="md"
                    name="playerLimit"
                    type="number"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    type="text"
                    name="image"
                    placeholder="Image url"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    name="timming"
                    type="datetime-local"
                    onChange={onInputChange}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    placeholder="Durating in Hours"
                    size="md"
                    name="duration"
                    type="number"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Address"
                    size="md"
                    name="address"
                    type="address"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Add Event
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </FormControl>
    </div>
  );
}

export default AddEditEvent;
