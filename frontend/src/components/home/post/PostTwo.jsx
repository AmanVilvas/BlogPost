import React from 'react'
import {Stack, Typography} from '@mui/material'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlineRetweet } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";



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
                width={'auto'} height={'280px'} />

                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'row'} 
                    gap={2} 
                    m={1}>
                        <AiOutlineLike size={30}/>
                        <FaRegCommentDots size={30} />
                <AiOutlineRetweet size={30}/>
                <PiShareFat  size={30}/>

                    </Stack>
                    <Stack flexDirection={'row'}
                    gap={1}
                    position={'relative'}
                    top={-3}
                    left={4}>
                        <Typography variant='caption' fontSize={'0.9rem'} color='gray'>
                            2 Likes .
                        </Typography>
                        <Typography variant='caption' fontSize={'0.9rem'} color='gray'>
                            1 comment {' '}
                        </Typography>
                    </Stack>
                </Stack>

            </Stack>
        </div>
    )
}

export default PostTwo
