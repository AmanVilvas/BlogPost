import React from 'react'
import {Stack, Typography} from '@mui/material'
import { FcLike } from "react-icons/fc";
import { FaComments } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoShare } from "react-icons/io5";



function PostTwo() {
    return (
        <div>
            <Stack flexDirection={'column'} justifyContent={'space-between'}>
                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'column'}></Stack>
                    <Typography variant='h6'
                    fontWeight={'bold'}
                    fontSize={'1rem'}
                    >Aman Sharma</Typography>
                    <Typography variant='h5'
                    fontSize={'1.5em'}
                    >description will look like this</Typography>
                </Stack>
                <img src="/black clover.webp" alt="" loading='lazy'
                width={'400px'} height={'auto'} />

                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'row'} 
                    gap={2} 
                    m={1}>
                        <FcLike size={30}/>
                        <FaComments size={30} />
                <AiOutlineRetweet size={30}/>
                <IoShare size={30}/>

                    </Stack>
                    <Stack flexDirection={'row'}
                    gap={1}
                    position={'relative'}
                    top={-3}
                    left={4}>
                        <Typography variant='caption' fontSize={'1rem'} color='gray'>
                            2 Likes .
                        </Typography>
                        <Typography variant='caption' fontSize={'1rem'} color='gray'>
                            1 comment {' '}
                        </Typography>
                    </Stack>
                </Stack>

            </Stack>
        </div>
    )
}

export default PostTwo
