import React from 'react'
import { Stack, Typography, Avatar, Button } from '@mui/material'

function Input() {
    return (
        <div>
            <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={3}
            width={"70%"}
            height={28}
            borderBottom={'2px solid gray'}
            my={5}
            mx={'auto'}
            >
                <Stack flexDirection={'row'} alignSelf={'center'} gap={2}>
                    <Avatar src="" alt="AJ" />
                    <Typography 
                    color='gray'
                    mt={1}
                    >Start your thread...</Typography>
                </Stack>
                <Button size='medium'
                sx={{
                 ':hover':{
                    color:'green'
                 }   
                }}
                >Post</Button>
            </Stack>
        </div>
    )
}

export default Input
