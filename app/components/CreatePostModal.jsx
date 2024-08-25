'use client'
import React, { useState, useRef } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  VStack,
} from "@chakra-ui/react"

import { addDataToFireStore } from "../utils/firebaseUtils";
export default function CreatePostModal({ isOpen, onClose, onNewPost }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState('')

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault()
      setTags([...tags, currentTag.trim()])
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      tags,
      author: 'Current User',
      upvotes: 0,
      downvotes: 0,
      comments: []
    }
    const author_name = "current user";
    const upvotes = 0
    const downvotes = 0
    const added = await addDataToFireStore(title, content , tags, author_name, upvotes, downvotes);

    onNewPost(postData)
    onClose()
    if(added){
      setTitle('')
      setContent('')
      setTags([])
      alert("data pushed to fb")
    }
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      
    >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Create a new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack as='form' mx='auto' maxWidth={400} action={addDataToFireStore} spacing={4}>
          <FormControl >
            <FormLabel>Title</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Post title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
            <Textarea
              placeholder="Write your post content here"
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Tags</FormLabel>
            <Input
              placeholder="Enter tags and press Enter"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagInput}
              name='tags'
            />
            <HStack spacing={2} mt={2}>
              {tags.map((tag, index) => (
                <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="blue">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(tag)} />
                </Tag>
              ))}
            </HStack>
            </FormControl>
            </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Create Post
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}