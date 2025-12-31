import React from 'react'
import { Avatar, Stack, Typography, useMediaQuery } from '@mui/material'
import { IoMdMenu } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import PostOne from './post/PostOne';
import PostTwo from './post/PostTwo';
import { useDispatch,useSelector } from 'react-redux';
import { toggleMyMenu } from '../../redux/slice';

function Post() {
    const _300 = useMediaQuery('(min-width:300px)')
    const _400 = useMediaQuery('(min-width:400px)')
    const _700 = useMediaQuery('(min-width:700px)')
    
    const {darkMode} = useSelector(state=>state.service)
    const dispatch = useDispatch()
    const handleOpenMenu = (e)=>{
        dispatch(toggleMyMenu(e.currentTarget))
    }

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
                    color={darkMode ? 'white' : 'grey'}
                    gap={1}
                    fontSize={'1rem'}
                    justifyContent={'center'}
                >
                    <Typography
                    variant={'caption'}
                    color={darkMode ? 'white' : 'GrayText'}
                    fontSize={'1rem'}
                    position={'relative'}
                    top={2} 
                    >
                        24h
                    </Typography>

                    <Stack
                        sx={{
                            cursor: 'pointer',
                            borderRadius: '50%',
                            padding: '4px',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                transform: 'scale(0.95)',
                            }
                        }}
                        onClick={handleOpenMenu}
                    >
                        <BsThreeDots size={_700 ? 25 : 15} />
                    </Stack>

                    
                </Stack>

            </Stack>
        </div>
    )
}

export default Post