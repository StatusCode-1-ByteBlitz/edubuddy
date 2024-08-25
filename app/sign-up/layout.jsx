'use client'
import React from 'react'
import {Center} from '@chakra-ui/react'
export default function RootLayout(props) {
    const { children } = props;
  return (
    <Center minHeight={'100vh'}>
        {children}
    </Center>
  )
}
