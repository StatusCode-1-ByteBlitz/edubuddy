'use client'
import { Container } from "@chakra-ui/react";
import DashboardNotice from "./Notice";
import { Flex } from "@chakra-ui/react";
import DashboardCourses from "./Courses";
import PomodoroTimer from "../components/PomodoroTimer";
const DashBoardData = () => {
  return (
    <Flex direction={'column'} gap={'1rem'}>
      <DashboardNotice />
      {/* <DashboardCourses /> */}
      <PomodoroTimer />
    </Flex>
  );
};
export default DashBoardData;

// import {
//   Box,
//   Container,
//   Flex,
//   VStack,
//   HStack,
//   Heading,
//   Text,
//   Avatar,
//   Button,
//   Icon,
//   {useColorModeValue},
//   SimpleGrid,
//   Progress,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
// } from "@chakra-ui/react";
// import { FaBook, FaCalendar, FaChalkboardTeacher, FaClipboard, FaComments } from "react-icons/fa";
// import DashboardNotice from "./Notice";
// import DashboardCourses from "./Courses";

// const DashBoardData = () => {
//   const bgColor = useColorModeValue("gray.50", "gray.900");
//   const cardBgColor = useColorModeValue("white", "gray.800");

//   return (
//     <Box minH="100vh" bg={bgColor}>
//       <Flex>
//         {/* Sidebar */}
//         <Box w="250px" bg={cardBgColor} p={5} shadow="md">
//           <VStack spacing={6} align="stretch">
//             <Heading size="md">Edu Buddy</Heading>
//             <NavItem icon={FaChalkboardTeacher} label="Dashboard" active />
//             <NavItem icon={FaBook} label="Courses" />
//             <NavItem icon={FaComments} label="Chatrooms" />
//             <NavItem icon={FaClipboard} label="Noticeboards" />
//             <NavItem icon={FaCalendar} label="Calendar" />
//           </VStack>
//         </Box>

//         {/* Main Content */}
//         <Box flex={1}>
//           {/* Header */}
//           <Box bg={cardBgColor} p={4} shadow="md">
//             <Flex justify="space-between" align="center">
//               <Heading size="lg">Student Dashboard</Heading>
//               <HStack>
//                 <Button colorScheme="blue" size="sm">
//                   New Message
//                 </Button>
//                 <Avatar name="John Doe" src="/placeholder-user.jpg" />
//               </HStack>
//             </Flex>
//           </Box>

//           {/* Dashboard Content */}
//           <Container maxW="container.xl" py={8}>
//             <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
//               {/* Quick Stats */}
//               <Box bg={cardBgColor} p={6} rounded="lg" shadow="md">
//                 <Heading size="md" mb={4}>
//                   Quick Stats
//                 </Heading>
//                 <SimpleGrid columns={2} spacing={4}>
//                   <Stat>
//                     <StatLabel>Courses</StatLabel>
//                     <StatNumber>5</StatNumber>
//                     <StatHelpText>In progress</StatHelpText>
//                   </Stat>
//                   <Stat>
//                     <StatLabel>Assignments</StatLabel>
//                     <StatNumber>12</StatNumber>
//                     <StatHelpText>3 due this week</StatHelpText>
//                   </Stat>
//                   <Stat>
//                     <StatLabel>Overall Progress</StatLabel>
//                     <StatNumber>68%</StatNumber>
//                     <Progress value={68} size="sm" colorScheme="green" />
//                   </Stat>
//                   <Stat>
//                     <StatLabel>Discussion Posts</StatLabel>
//                     <StatNumber>24</StatNumber>
//                     <StatHelpText>Last 30 days</StatHelpText>
//                   </Stat>
//                 </SimpleGrid>
//               </Box>

//               {/* Upcoming Events */}
//               <Box bg={cardBgColor} p={6} rounded="lg" shadow="md">
//                 <Heading size="md" mb={4}>
//                   Upcoming Events
//                 </Heading>
//                 <VStack align="stretch" spacing={4}>
//                   <EventItem
//                     title="Math Quiz"
//                     date="Tomorrow, 2:00 PM"
//                     description="Chapter 5: Calculus"
//                   />
//                   <EventItem
//                     title="Group Project Meeting"
//                     date="Wed, 4:00 PM"
//                     description="Physics Lab"
//                   />
//                   <EventItem
//                     title="Literature Essay Due"
//                     date="Fri, 11:59 PM"
//                     description="Min. 1000 words"
//                   />
//                 </VStack>
//               </Box>

//               {/* Notices */}
//               <Box bg={cardBgColor} p={6} rounded="lg" shadow="md">
//                 <Heading size="md" mb={4}>
//                   Notices
//                 </Heading>
//                 <DashboardNotice />
//               </Box>

//               {/* Courses */}
//               <Box bg={cardBgColor} p={6} rounded="lg" shadow="md">
//                 <Heading size="md" mb={4}>
//                   Your Courses
//                 </Heading>
//                 <DashboardCourses />
//               </Box>
//             </SimpleGrid>
//           </Container>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// const NavItem = ({ icon, label, active = false }) => {
//   const activeColor = useColorModeValue("blue.500", "blue.200");
//   const hoverBg = useColorModeValue("gray.100", "gray.700");

//   return (
//     <Button
//       leftIcon={<Icon as={icon} />}
//       justifyContent="flex-start"
//       variant={active ? "solid" : "ghost"}
//       colorScheme={active ? "blue" : "gray"}
//       w="full"
//       py={2}
//       _hover={{ bg: hoverBg }}
//     >
//       {label}
//     </Button>
//   );
// };

// const EventItem = ({ title, date, description }) => (
//   <Box p={3} bg={useColorModeValue("gray.50", "gray.700")} rounded="md">
//     <Text fontWeight="bold">{title}</Text>
//     <Text fontSize="sm" color="gray.500">
//       {date}
//     </Text>
//     <Text fontSize="sm" mt={1}>
//       {description}
//     </Text>
//   </Box>
// );

// export default DashBoardData;
