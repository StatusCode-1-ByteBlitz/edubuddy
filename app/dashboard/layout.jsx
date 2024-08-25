// "use client";
// import { Inter } from "next/font/google";
// import { ChakraProvider } from "@chakra-ui/react";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase/config";
// import { useAuthState } from "react-firebase-hooks/auth";
// import {
//   IconButton,
//   Avatar,
//   Box,
//   CloseButton,
//   Flex,
//   HStack,
//   VStack,
//   Icon,
//   useColorModeValue,
//   Text,
//   Drawer,
//   DrawerContent,
//   useDisclosure,
//   BoxProps,
//   FlexProps,
//   Menu,
//   MenuButton,
//   MenuDivider,
//   MenuItem,
//   MenuList,
//   Button,
//   Container,
// } from "@chakra-ui/react";

// import {
//   FiHome,
//   FiTrendingUp,
//   FiCompass,
//   FiStar,
//   FiSettings,
//   FiMenu,
//   FiBell,
//   FiChevronDown,
// } from "react-icons/fi";

// const inter = Inter({ subsets: ["latin"] });

// const linkItems = [
//   // ... (link items remain the same)
// ];

// const SidebarContent = ({ onClose, ...rest }) => {
//   const [user] = useAuthState(auth);
//   const router = useRouter();

//   useEffect(() => {
//     if (user) {
//       console.log("user exists : ", user);
//       router.push("/dashboard");
//     } else {
//       console.log("The existing user's info :", { user });
//     }
//   }, [user, router]);

//   return (
//     <Box
//       transition="3s ease"
//       bg={useColorModeValue("white", "gray.900")}
//       borderRight="1px"
//       borderRightColor={useColorModeValue("gray.200", "gray.700")}
//       w={{ base: "full", md: 60 }}
//       pos="fixed"
//       h="full"
//       {...rest}
//     >
//       <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
//         <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
//           EduBuddy
//         </Text>
//         <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
//       </Flex>
//       {linkItems.map((link) => (
//         <NavItem
//           onClick={() => router.push(link.redirect)}
//           key={link.name}
//           icon={link.icon}
//         >
//           {link.name}
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

// // ... (NavItem component remains the same)

// const MobileNav = ({ onOpen, ...rest }) => {
//   const router = useRouter();
//   const [user] = useAuthState(auth);

//   // ... (rest of MobileNav component remains the same)
// };

// const RootLayout = ({ children }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box
//       minH="100vh"
//       minW="100vw"
//       bg={useColorModeValue("gray.100", "gray.900")}
//     >
//       <SidebarContent
//         onClose={onClose}
//         display={{ base: "none", md: "block" }}
//       />
//       <Drawer
//         isOpen={isOpen}
//         placement="left"
//         onClose={onClose}
//         returnFocusOnClose={false}
//         onOverlayClick={onClose}
//         size="full"
//       >
//         <DrawerContent>
//           <SidebarContent onClose={onClose} />
//         </DrawerContent>
//       </Drawer>
//       <MobileNav onOpen={onOpen} />
//       <Box ml={{ base: 0, md: 60 }} p="4">
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default RootLayout;

"use client";
import { Inter } from "next/font/google";
// import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Container,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { BiSolidConversation } from "react-icons/bi";
import { MdQuiz } from "react-icons/md";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGlobalContext } from "../context/Providers";
const linkItems = [
  { name: "Home", icon: FiHome, redirect: "/dashboard" },
  {
    name: "Discussions",
    icon: BiSolidConversation,
    redirect: "/dashboard/posts",
  },
  { name: "Quiz", icon: MdQuiz, redirect: "/dashboard/quiz" },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const [isMounted, setIsMounted] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isClient, setIsClient] = useState(true);
  // const router_ = useRouter();
  const { state, setUser } = useGlobalContext;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && user) {
      // console.log("user exists : ", user);
      router.push("/dashboard");
    } else if (isMounted) {
      // console.log("The existing user's  info :", { user });
      // setUser(user);
      // console.log("Context API: ", state.user);
    }
  }, [isMounted, user]);

  if (!isMounted) {
    return null;
  }

  if (user) {
    // console.log("user exists : ", user);
    router.push("/dashboard");
  } else {
    // console.log("The existing user's  info :", { user });
    // setUser(user);
    // console.log("Context API: ", state.user);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {state}
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          EduBuddy
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem
          onClick={() => router.push(link.redirect)}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, onClick, ...rest }) => {
  return (
    <Box
      onClick={onClick}
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="Open sidebar menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        EduBuddy
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Notifications"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user !== null ? user.email.split("@")[0] : "User"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem>
                <Button
                  onClick={() => {
                    signOut(auth);
                    sessionStorage.removeItem("user");
                    router.push("/");
                  }}
                >
                  Sign out
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const RootLayout = (props) => {
  const { children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default RootLayout;
