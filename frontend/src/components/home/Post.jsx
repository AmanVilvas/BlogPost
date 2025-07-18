import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import { IoMdMenu } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import PostOne from './post/PostOne';
import PostTwo from './post/PostTwo';

function Post() {
    return (
        <div>
            <Stack
                flexDirection={'row'}
                justifyContent={'space-between'}
                borderBottom={'1px grey solid'}
                p={3}
                mx={'auto'}
                width={'70%'}
                sx={{
                    ":hover": {
                        boxShadow: '5px 5px 5px grey'
                    },
                    transition: 'all ease-in-out .3s'

                }}
            >
                
                <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
                    <PostOne />
                    <PostTwo />
                </Stack>

                <Stack
                    flexDirection={'row'}
                    color={'grey'}
                    gap={1}
                    fontSize={'1rem'}
                    justifyContent={'center'}
                >
                    <Typography
                    variant={'caption'}
                    color={'GrayText'}
                    fontSize={'1rem'}
                    // position={'relative'}
                    // top={2}
                    >
                        24h
                    </Typography>

                    <BsThreeDots size={25} />

                    
                </Stack>

            </Stack>
        </div>
    )
}

export default Post
