"use client";
import React from "react";
import { Spinner, Box, Center } from "@chakra-ui/react";
function Loading() {
  return (
    <Box width="100vw" height="100vh">
      <Center>
        <Spinner />
      </Center>
    </Box>
  );
}

export default Loading;
