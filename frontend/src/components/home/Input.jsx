import React from 'react'
import { Stack, Typography, Avatar, Button, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'

function Input() {

const dispatch = useDispatch()
const { myInfo } = useSelector(state => state.service)
const handleAddPost = () => {
    dispatch(addPostModel(true))
}

    const _700 = useMediaQuery('(min-width:700px)')

    return (
        <div>
        {
            _700 ? <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={3}
            width={"70%"}
            height={28}
            borderBottom={'2px solid gray'}
            my={5}
            mx={'auto'}
            onClick={handleAddPost}
            >
                <Stack flexDirection={'row'} alignSelf={'center'} gap={2}>
                    <Avatar src={myInfo?.profilePic || ''} alt={myInfo?.userName} />
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
            :
                null
        }
        </div>
    )
}

export default Input
