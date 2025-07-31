import React from 'react'
import { Avatar, Stack, Typography, useMediaQuery } from '@mui/material'
import { IoMdMenu } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import PostOne from './post/PostOne';
import PostTwo from './post/PostTwo';

function Post() {
    const _300 = useMediaQuery('(min-width:300px)')
    const _400 = useMediaQuery('(min-width:400px)')
    const _700 = useMediaQuery('(min-width:700px)')
    
    return (
        <div>
            <Stack
                flexDirection={'row'}
                justifyContent={'center'}
                borderBottom={'1px grey solid'}
                p={_700 ? 2 : _400 ? 1 : '5px'}
                mx={'auto'}
                width={_700 ? '70%' : _300 ? '90%' : '100%'}
                sx={{
                    ":hover": {
                        boxShadow: _700 ? '5px 5px 5px grey' : ""
                    },
                    transition: 'all ease-in-out .3s'
                    
                }}
            >
                
                <Stack flexDirection={'row'} gap={_700 ? 2 : 1} justifyContent={'center'}>
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
                    position={'relative'}
                    top={2} 
                    >
                        24h
                    </Typography>

                    <BsThreeDots size={_700 ? 25 : 15} />

                    
                </Stack>

            </Stack>
        </div>
    )
}

export default Post
