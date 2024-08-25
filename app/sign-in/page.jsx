"use client";
import React, { useState, useEffect } from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  CardHeader,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";


function SignIn() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signInUserWithEmailPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  useEffect(() => {
    email.length == 0 ? setEmailError(true) : setEmailError(false);
    password.length == 0 ? setPassError(true) : setPassError(false);
  }, [email, password]);

  function verifyFields() {
    return !(emailError && passError);
  }
  //   const { toggleColorMode } = useColorMode();
  //   const formBackground = useColorModeValue('gray.100', 'gray.700');

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     // Handle form submission logic here
  //     try {
  //       const res = await createUserWithEmailPassword(email, password);
  //       setEmail("");
  //       setPassword("");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleSignIn = async () => {
    // console.log({ email, password });
    try {
      const res = await signInUserWithEmailPassword(email, password);
      console.log({ res });
      // sessionStorage.setItem('user', true)
      setEmail("");
      setPassword("");
      router.push("/dashboard ");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card width="xl">
      <CardHeader>
        <Heading size="md">Sign in to Edubuddy</Heading>
      </CardHeader>
      <CardBody>
        <form
        //   onSubmit={ }
        >
          <Flex gap="2.5" direction="column">
            <FormControl>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {emailError && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    //   onClick={ }
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* <ButtonGroup> */}
            <Button
              variant="outline"
              onClick={handleSignIn}
              isLoading={loading}
            >
              Sign in
            </Button>

            {/* <Button
                // onClick={}
                colorScheme="purple"
                isLoading={loading}
              >
                Sign in
              </Button>
            </ButtonGroup> */}
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
}

export default SignIn;
