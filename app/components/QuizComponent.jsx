'use client';
import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  RadioGroup,
  Radio,
  Button,
  useToast,
  Progress,
  Container,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Transfer Markup Language",
      "Hypertext Markup Language",
      "Hypertext Machine Language",
      "HyperLink Markup Language",
    ],
    correct: 1,
  },
  {
    question: "What is the effect of the <b> tag?",
    options: [
      "It is used to change the font size",
      "It converts the text within it to bold font",
      "It is used to write black-colored font",
      "None of the above",
    ],
    correct: 1,
  },
  {
    question: "What tag is used to render an image on a webpage?",
    options: [
      "img",
      "src",
      "image",
      "HyperLink Markup Language",
    ],
    correct: 0,
  },
  {
    question: "What is the correct syntax to write an HTML comment?",
    options: [
      "// Comment",
      "# Comment",
      "<!-- Comment -->",
      "/* Comment */",
    ],
    correct: 2,
  },
  {
    question: "Which of the following tags is used to insert a line-break in HTML?",
    options: [
      "<br>",
      "<a>",
      "<pre>",
      "<b>",
    ],
    correct: 0,
  },
  {
    question: "How to create an unordered list in HTML?",
    options: [
      "<ul>",
      "<ol>",
      "<i>",
      "<li>",
    ],
    correct: 0,
  },
  {
    question: "How to create a hyperlink in HTML?",
    options: [
      "<a url='www.google.com'> google.com </a>",
      "<a link='www.google.com'> google.com </a>",
      "<a href='www.google.com'> google.com </a>",
      "<a> google.com </a>",
    ],
    correct: 2,
  },
  {
    question: "The <hr> tag in HTML is used for -",
    options: [
      "new line",
      "vertical ruler",
      "new paragraph",
      "horizontal ruler",
    ],
    correct: 3,
  },
  {
    question: "How to insert a background image in HTML?",
    options: [
      "<body background='img.png'>",
      "<img background='img.png'>",
      "<bg-image='img.png'>",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question: "An HTML program is saved by using the ____ extension.",
    options: [
      ".ht",
      ".html",
      ".hml",
      ".xml",
    ],
    correct: 1,
  },
  {
    question: "Which of the following HTML tags is used to display text with a scrolling effect?",
    options: [
      "<marquee>",
      "<scroll>",
      "<div>",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question: "The tags in HTML are -",
    options: [
      "case-sensitive",
      "in upper case",
      "in lowercase",
      "not case sensitive",
    ],
    correct: 3,
  },
  {
    question: "Which of the following tags is used to initialize the document type?",
    options: [
      "<Doctype HTML>",
      "<\\Doctype html>",
      "<!DOCTYPE html>",
      "<Doctype>",
    ],
    correct: 2,
  },
  {
    question: "Which of the following tags doesn't require a closing tag?",
    options: [
      "<br>",
      "<hr>",
      "Both A and B",
      "None of the above",
    ],
    correct: 2,
  },
  {
    question: "Which property allows an image link to show a text label?",
    options: [
      "alt",
      "str",
      "alternative",
      "None of the above",
    ],
    correct: 0,
  },
];

export default function QuizComponent() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    if (selectedOption === '') {
      toast({
        title: "Please select an answer",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (Number(selectedOption) === quizData[currentQuiz].correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuiz < quizData.length - 1) {
      setCurrentQuiz((prevQuiz) => prevQuiz + 1);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setSelectedOption('');
    setQuizCompleted(false);
  };
const bgColor = useColorModeValue('white', 'black')
  return (
    <Container maxW="4xl" centerContent>
      <Box
        w="full"
        maxW="600px"
        m={4}
        p={6}
        borderRadius="xl"
        boxShadow="xl"
        bg={bgColor}
        border="2px solid"
        borderColor="blue.400"
      >
        {!quizCompleted ? (
          <VStack spacing={6} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontWeight="bold" fontSize="lg">
                Question {currentQuiz + 1} of {quizData.length}
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                Score: {score}
              </Text>
            </Flex>
            <Progress value={(currentQuiz / quizData.length) * 100} colorScheme="blue" size="sm" borderRadius="full" />
            <Heading as="h2" size="lg" color="blue.600" mb={4}>
              {quizData[currentQuiz].question}
            </Heading>
            <RadioGroup
              onChange={(value) => setSelectedOption(value)}
              value={selectedOption}
            >
              <VStack spacing={4} align="stretch">
                {quizData[currentQuiz].options.map((option, index) => (
                  <Box
                    key={index}
                    borderWidth={1}
                    borderRadius="md"
                    borderColor="gray.200"
                    _hover={{ borderColor: "blue.400", bg: "blue.50" }}
                    transition="all 0.2s"
                    cursor="pointer"

                  >
                    <Radio
                      value={index.toString()}
                      colorScheme="blue"
                      size="lg"
                      w="100%"
                      p={3}
                    >
                      {option }
                    </Radio>
                  </Box>
                ))}
              </VStack>
            </RadioGroup>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              size="lg"
              width="full"
              mt={4}
              _hover={{ bg: "blue.600" }}
              transition="all 0.2s"
            >
              {currentQuiz === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </VStack>
        ) : (
          <VStack spacing={6} align="center">
            <Heading as="h2" size="xl" textAlign="center" color="purple.600">
              Quiz Completed!
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Your Score: {score}/{quizData.length}
            </Text>
            <Text fontSize="lg" textAlign="center">
              {score === quizData.length
                ? "Perfect score! You're an HTML expert! 🎉"
                : score >= quizData.length * 0.7
                ? "Great job! You have a solid understanding of HTML. 👍"
                : "Keep practicing! You're on your way to mastering HTML. 💪"}
            </Text>
            <Button
              onClick={resetQuiz}
              colorScheme="purple"
              size="lg"
              _hover={{ bg: "purple.600" }}
              transition="all 0.2s"
            >
              Try Again
            </Button>
          </VStack>
        )}
      </Box>
    </Container>
  );
}