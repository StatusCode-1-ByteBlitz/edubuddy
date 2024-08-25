'use client'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";

const DashboardNotice = () => {
  return (
    <Alert status="info" variant="left-accent">
      <Box>
        <AlertTitle>Announcement</AlertTitle>
        <AlertDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          velit ipsum, posuere quis bibendum vel
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export default DashboardNotice;
