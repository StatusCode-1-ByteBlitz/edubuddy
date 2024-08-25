'use client'
import React, {useState, useEffect} from 'react'
import {Card, CardHeader, Flex,Box,Button,CardBody, Container} from '@chakra-ui/react';
import PostCard from '../../components/PostList';
import {fetchDataFromFireStore} from '../../utils/firebaseUtils';
export default function PostsUi() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function fetchData(){
      const data = await fetchDataFromFireStore();
      setUserData(data)
    }
    fetchData();
  }, [])
  // console.log("User Data : ", userData[0]["author_name"])
  return (
    <Container>

    <Flex gap={"0.75rem"} direction={'column'} wrap={'wrap'}>
      {userData.map((user) => {
    // console.log("each user : ", user.text);
    return (
      <PostCard 
        pid={user.id} 
        title={user.title} 
        content={user.text} 
        author={user.author_name} 
        tags={user.tags} 
        upvotes={user.upvotes} 
        downvotes={user.downvotes} 
        comments={[{
          pid: "blablabla",
          text: "newComment",
          author: "default_comment_guy",
          upvotes: 0,
          downvotes: 0,
        }]}
      />    
    );
  })}
    </Flex>
  </Container>
    // <PostCard  title={"Test"} content={"qawsdxctfvygbuhiujhgfds"} author={"testUser"} tags={["qwe", "vbnm", "fghj"]} upvotes={5} downvotes={1} comments={[{'author':"userTest", 'text':"edrtfvyugibhnljkddyrtrfuygbuh", upvotes:3, downvotes:1}]}/>
    // <Card>
    //     <CardHeader>
    //       <Flex>
    //         <Box>
    //           <h5>Posts</h5>
    //         </Box>
    //         <Box>
    //           <Button color="primary">New Post</Button>
    //         </Box>
    //       </Flex>
    //     </CardHeader>
    //     <CardBody>
    //       {/* Post list goes here */}
    //     </CardBody>
    // </Card>
  )
}
