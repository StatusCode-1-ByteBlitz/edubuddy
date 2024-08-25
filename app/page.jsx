"use client";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChalkboardTeacher, FaComments, FaClipboard } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {state, setUser } = useGlobalContext;
  // const userSession = sessionStorage.getItem("user");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user) {
      console.log("user exists : ", user);
      console.log("user from redux : ", user_);
      router.push("/dashboard");
    } else if (isMounted) {
      console.log("The existing user's  info :", { user });
    }
  }, [isMounted, user, router]);


  if (!isMounted) {
    return null;
  }

  if (user ) {
    console.log("user exists : ", user);
    router.push("/dashboard");
  } else {
    console.log("The existing user's  info :", { user });
  }
  const boxBg = useColorModeValue("gray.100", "gray.900");
  return (
    <Box>
      {/* <Button
        colorScheme="purple"
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
        }}
      >
        Log out
      </Button> */}
      <Box as="header" bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold">Edu Buddy</Box>
          <Flex alignItems="center">
            <Stack direction="row" spacing={4}>
              <Link href="#features" passHref>
                <Button as="a" variant="ghost">
                  Features
                </Button>
              </Link>
              <Link href="/sign-up" passHref>
                {user ? (
                   <Button
                   variant="ghost"
                   onClick={() => {
                     signOut(auth);
                    //  sessionStorage.removeItem("user");
                   }}
                 >
                   Log out
                 </Button>
                ) : (
                  <Button onClick={() => router.push("/sign-in")} variant="ghost">
                    Login
                  </Button>
                 
                )}
              </Link>
              {/* <Button colorScheme="blue">Sign Up</Button> */}
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Container maxW="container.xl">
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight="110%"
          >
            Welcome to <br />
            <Text as="span" color="blue.400">
              Edu Buddy
            </Text>
          </Heading>
          <Text color="gray.500" maxW="3xl" mx="auto">
            Empower your learning journey with Edu Buddy. Access your
            personalized student dashboard, engage in interactive chatrooms, and
            stay updated with our dynamic noticeboards.
          </Text>
          <Stack
            direction="column"
            spacing={3}
            align="center"
            alignSelf="center"
            position="relative"
          >
            <Button onClick={() => router.push("/dashboard")} colorScheme="blue" rounded="full" px={6} size="lg">
              Get Started
            </Button>
            <Link href="#features" passHref>
              <Button variant="link" colorScheme="blue" size="sm">
                Learn More
              </Button>
            </Link>
          </Stack>
        </Stack>

        <Box id="features" py={20}>
          <Heading as="h2" size="xl" textAlign="center" mb={10}>
            Features
          </Heading>
          <Stack spacing={10} direction={{ base: "column", md: "row" }}>
            <FeatureCard
              icon={FaChalkboardTeacher}
              title="Student Dashboard"
              text="Access your personalized dashboard to track your progress, assignments, and upcoming events."
            />
            <FeatureCard
              icon={FaComments}
              title="Interactive Chatrooms"
              text="Engage with your peers and instructors in real-time through our interactive chatrooms."
            />
            <FeatureCard
              icon={FaClipboard}
              title="Dynamic Noticeboards"
              text="Stay updated with the latest announcements, events, and important information through our dynamic noticeboards."
            />
          </Stack>
        </Box>

        <Box py={20} textAlign="center">
          <Heading as="h2" size="xl" mb={6}>
            Ready to enhance your learning experience?
          </Heading>
          <Button colorScheme="blue" size="lg" rounded="full" px={8}>
            Join Edu Buddy Today
          </Button>
        </Box>
      </Container>
      
      <Box as="footer" bg={boxBg} py={6}>
        <Container maxW="container.xl">
          <Text textAlign="center">© 2024 Edu Buddy. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <Stack align="center" textAlign="center">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="blue.500"
        mb={1}
      >
        <Icon as={icon} w={10} h={10} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color="gray.600">{text}</Text>
    </Stack>
  );
}
