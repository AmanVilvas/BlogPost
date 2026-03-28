import React, { useState, useEffect } from 'react'
import { Avatar, Stack, Typography, useMediaQuery } from '@mui/material'
import { IoIosMore, IoMdMenu } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import PostOne from './post/PostOne';
import PostTwo from './post/PostTwo';
import { useDispatch,useSelector } from 'react-redux';
import { addPostID, toggleMyMenu } from '../../redux/slice';

// Returns a short relative time string like "2h", "3d", "just now"
function timeAgo(dateStr) {
    if (!dateStr) return ''
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diff = Math.floor((now - then) / 1000) // seconds
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d`
    return `${Math.floor(diff / 2592000)}mo`
}

function Post({e})
 {
    // console.log(ele);
    const {darkMode, myInfo} = useSelector(state=>state.service) 
    const [isAdmin, setisAdmin] = useState(false)
    const _300 = useMediaQuery('(min-width:300px)')
    const _400 = useMediaQuery('(min-width:400px)')
    const _700 = useMediaQuery('(min-width:700px)')
    
    
    const dispatch = useDispatch()

    const handleOpenMenu = (event)=>{
    dispatch(addPostID(e._id))
    dispatch(toggleMyMenu(event.currentTarget))

    }
    // console.log(e._id);
    
    const checkIsAdmin = ()=>{
        if(e?.admin._id == myInfo._id){
            setisAdmin(true)
            return
        }
        setisAdmin(false)
    }

        useEffect(()=>{
            if(e && myInfo){
                checkIsAdmin()
            }
        },[e, myInfo])


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
                    <PostOne e={e} />
                    <PostTwo e={e} />
                </Stack>
{/* 2:54 */}
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
                        {timeAgo(e?.createdAt)}
                    </Typography>
                {
                    isAdmin ? (
                        <Stack
                        sx={{
                            cursor: 'pointer',
                            // borderRadius: '50%',
                            padding: '4.5px'
                            // transition: 'all 0.2s ease-in-out',
                            // '&:hover': {
                            //     backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            //     transform: 'scale(1.1)',
                            // },
                            // '&:active': {
                            //     transform: 'scale(0.95)',
                            // }
                        }}
                        onClick={handleOpenMenu}
                    >
                        <BsThreeDots size={_700 ? 25 : 15} />
                    </Stack> 

                    
                    ) : <BsThreeDots size={_700 ? 25 : 15} />
                }
                    
                </Stack>

            </Stack>
        </div>
    )
}

export default Post