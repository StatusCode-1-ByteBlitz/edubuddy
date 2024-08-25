"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Tag,
  IconButton,
  VStack,
  HStack,
  useColorModeValue,
  Textarea,
  FormControl,
} from "@chakra-ui/react";
import {
  FaArrowUp,
  FaArrowDown,
  FaShare,
  FaReply,
  FaPlus,
} from "react-icons/fa";
import CreatePostModal from "./CreatePostModal";
import {addCommentToFireStore} from '../utils/firebaseUtils';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Button leftIcon={<FaPlus />} onClick={() => setIsModalOpen(true)}>
        Create New Post
      </Button>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNewPost={handleNewPost}
      />
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))} 
    </VStack>
  );
};

const PostCard = ({
  pid,
  title,
  content,
  author,
  tags,
  upvotes,
  downvotes,
  comments: initialComments,
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [userID, setUserID] = useState(pid);
  const [user] = useAuthState(auth);
  const [upvotes_, setUpvotes] = useState(upvotes);
  const [downvotes_, setDownvotes] = useState(downvotes);


  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        pid: userID,
        text: newComment,
        author: user.displayName,
        upvotes: 0,
        downvotes: 0,
      };
      const added_comment = await addCommentToFireStore( newCommentObj.text, newCommentObj.pid, newCommentObj.author, newCommentObj.upvotes, newCommentObj.downvotes)
      if(added_comment){
        setComments([...comments, newCommentObj]);
        setNewComment("");
      }
    }
  };

  const updateUpvote = () => {
    setUpvotes(upvotes_ + 1);
    console.log("Upvotes : ", upvotes_)
  }
  
  const updateDownvote = () => {
    if(downvotes_ > 0){
      setDownvotes(downvotes_ - 1);
    }
    console.log("Downvotes : ", downvotes_)
  }

  console.log("Text : ", content);
  console.log("Author : ", author);
  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
    >
      <Box p={6}>
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          {title}
        </Text>
        <Text mb={4}>{content}</Text>
        <Text fontSize="sm" color="gray.500" mb={2}>
          Posted by {author}
        </Text>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <HStack spacing={2}>
            {tags.map((tag, index) => (
              <Tag key={index} size="sm" variant="subtle" colorScheme="blue">
                {tag}
              </Tag>
            ))}
          </HStack>
          <HStack spacing={2}>
            <IconButton
              aria-label="Upvote"
              icon={<FaArrowUp />}
              onClick={updateUpvote}
              size="sm"
              variant="ghost"
              colorScheme="blue"
            />
            <Text>{upvotes_}</Text>
            <IconButton
              aria-label="Downvote"
              icon={<FaArrowDown />}
              onClick={updateDownvote}
              size="sm"
              variant="ghost"
              colorScheme="blue"
            />
            <Text>{downvotes_}</Text>
            <IconButton
              aria-label="Share"
              icon={<FaShare />}
              size="sm"
              variant="ghost"
              colorScheme="blue"
            />
          </HStack>
        </Flex>
        <Button
          leftIcon={<FaReply />}
          variant="outline"
          size="sm"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments
            ? "Hide Comments"
            : `Show Comments (${comments.length})`}
        </Button>
      </Box>
      {showComments && (
        <Box p={6} borderTopWidth={1} borderColor={borderColor}>
          <VStack spacing={4} align="stretch" action={handleAddComment}>
            {comments.map((comment) => (
              <CommentThread key={comment.id} comment={comment} />
            ))}
            <FormControl onSubmit={handleAddComment}>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              size="sm"
              // onSubmit={handleAddComment}
            />
            <Button onClick={handleAddComment} size="sm" colorScheme="blue">
              Add Comment
            </Button>
            </FormControl>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

const CommentThread = ({ comment }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      console.log("Reply submitted:", replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <Box borderLeftWidth={2} borderColor="gray.200" pl={4}>
      <Text fontSize="sm" mb={1}>
        {comment.author}
      </Text>
      <Text mb={2}>{comment.text}</Text>
      <Flex justifyContent="space-between" alignItems="center">
        <HStack spacing={2}>
          <IconButton
            aria-label="Upvote comment"
            icon={<FaArrowUp />}
            size="xs"
            variant="ghost"
          />
          <Text fontSize="sm">{comment.upvotes}</Text>
          <IconButton
            aria-label="Downvote comment"
            icon={<FaArrowDown />}
            size="xs"
            variant="ghost"
          />
          <Text fontSize="sm">{comment.downvotes}</Text>
        </HStack>
        <Button
          size="xs"
          variant="link"
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          Reply
        </Button>
      </Flex>
      {showReplyInput && (
        <Box mt={2}>
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            size="sm"
            mb={2}
          />
          <Button onClick={handleReply} size="sm" colorScheme="blue">
            Submit Reply
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PostCard;
