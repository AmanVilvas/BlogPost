import React from 'react'
import { Stack, Button } from '@mui/material'
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
        <Button size='large'  sx={{
        mx:85, my:5, p:3, textDecoration:'underline', 
        }} >Load More</Button>
        </div>
    )
}

export default Home
