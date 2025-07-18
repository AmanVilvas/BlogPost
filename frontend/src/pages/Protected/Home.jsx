import React from 'react'
import { Stack } from '@mui/material'
import Input from '../../components/home/Input'
import Post from '../../components/home/Post'

function Home() {
    return (
        <div>
        <Input />
        <Stack flexDirection={'column'} gap={2} mb={10}>
            <Post /> 
            <Post /> 
            <Post /> 
            <Post /> 
            <Post /> 
            <Post />  
        </Stack>
        </div>
    )
}

export default Home
