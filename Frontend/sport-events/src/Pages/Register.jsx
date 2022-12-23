import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../Redux/Features/authSlice";

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

let initState = {
  email: "",
  password: "",
  name: "",
  image: "",
};

function Register(props) {
  const [formValue, setFormValue] = useState(initState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  useEffect(() => {
    error &&
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
    dispatch(register({ formValue, navigate, toast }));
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
        marginTop: "120px",
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
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={onInputChange}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="email address"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={onInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    name="image"
                    placeholder="image url"
                    onChange={onInputChange}
                  />
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Already have an account? <Link to="/login">Login</Link>
        </Box>
      </FormControl>
    </div>
  );
}

export default Register;
