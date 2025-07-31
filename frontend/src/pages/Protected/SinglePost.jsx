import React from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import Post from '../../components/home/Post'
import Comments from '../../components/home/post/Comments'

function SinglePost() {
    const[comment, setComment] = useState('')

    return (
        <div>
            <Stack flexDirection={'column'} my={5} gap={2}
            >
            <Post />
            <Stack gap={2} width={'80%'} mx={'auto'}
            flexDirection={'column'}        
                > <Comments /> </Stack>
                <Stack flexDirection={'column'} alignItems={'center'} gap={-1}>
                    <TextField variant='outlined' autoFocus 
                placeholder='Comment here...' id='comment' 
                sx={{ width:'50%', mx:'auto', my:1, p:1 }}
                onChange={(e)=> setComment(e.target.value)}
                />
                <Button variant='h5'>Post</Button>
                </Stack>
                
            </Stack>
        </div>
    )
}

export default SinglePost
