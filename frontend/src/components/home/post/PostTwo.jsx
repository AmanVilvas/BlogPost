import React from 'react'
import {Stack, Typography, useMediaQuery} from '@mui/material'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlineRetweet } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";



function PostTwo() {

    const _700 = useMediaQuery("(min-width:700px)")
    const _300 = useMediaQuery("(min-width:300px)")
    const _400 = useMediaQuery("(min-width:400px)")
    const _500 = useMediaQuery("(min-width:500px)")
    return (
        <div>
            <Stack flexDirection={'column'} justifyContent={'space-between'}>
                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'column'}></Stack>
                    <Typography variant='h6'
                    fontWeight={'bold'}
                    fontSize={_300 ? '1rem' : '0.8rem'}
                    >Aman Sharma</Typography>
                    <Typography variant='h5'
                    fontSize={_700 ? '1.4em' : _400 ? '1.2rem' : _300 ? '1rem' : '.8rem'}
                    >description will look like this</Typography>
                </Stack>
                <img src="/black clover.webp" alt="" loading='lazy'
                width={'auto'} height={_700 ? '280px' : _500 ? '250px' : _400 ? '200px' : '150px'} />

                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'row'} 
                    gap={2} 
                    m={1}>
                        <AiOutlineLike size={_700 ? 28 : _300 ? 25 : 22}/>
                        <FaRegCommentDots size={_700 ? 28 : _300 ? 25 : 22} />
                <AiOutlineRetweet size={_700 ? 28 : _300 ? 25 : 22}/>
                <PiShareFat  size={_700 ? 28 : _300 ? 25 : 22}/>

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
