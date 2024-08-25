"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Progress,
  useToast,
  ChakraProvider,
  Card,
  Stack,
  Flex,
} from "@chakra-ui/react";

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const toast = useToast();

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        toast({
          title: "Break time is over!",
          description: "Time to get back to work!",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setTime(25 * 60);
        setIsBreak(false);
      } else {
        toast({
          title: "Pomodoro completed!",
          description: "Take a short break!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTime(5 * 60);
        setIsBreak(true);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box as={Card} width={'50%'} maxWidth={"100%"} margin="auto" p={"10"}>
      <Flex justify={"center"} mb={"5"}>
        <Box
          bg={"green.600"}
          p={"2"}
          px={"4"}
          display={"inline-block"}
          borderRadius={"25"}
          fontSize={"10"}
          color={"white"}
        >
          {isBreak ? "Break Time" : "Focus Time"}
        </Box>
      </Flex>
      <VStack spacing={4} align="stretch">
        <Text fontSize="6xl" fontWeight="bold" textAlign="center">
          {formatTime(time)}
        </Text>
        <Progress
          borderRadius={"5"}
          value={(time / (isBreak ? 300 : 1500)) * 100}
          width={"100%"}
          size="md"
          alignSelf={"center"}
          colorScheme={"yellow"}
          mb={'2'}
        />
        <Flex gap={"0.75rem"} justifyContent={"center"}>
          <Button
            width={"100%"}
            onClick={toggleTimer}
            colorScheme={isActive ? "red" : "green"}
          >
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} width={"100%"} colorScheme="blue">
            Reset
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
