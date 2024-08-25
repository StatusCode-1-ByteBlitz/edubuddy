'use client'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Heading,
  Box,
  Container,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

const DashboardCourses = () => {
  return (
    <Card>
      <Box>
        <CardHeader>
          <Heading size={"md"}>Groups</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            velit ipsum, posuere quis bibendum vel.
          </Text>
        </CardBody>
      </Box>
    </Card>
  );
};

export default DashboardCourses;
