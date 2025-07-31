import React from 'react'
import { Stack, Typography, Chip, Avatar, Button, useMediaQuery } from '@mui/material'
import { FaInstagram } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';

function ProfileLayout() {
    const _300 = useMediaQuery('main-width:300px')
    const _660 = useMediaQuery('main-width:660px')
    const _700 = useMediaQuery('main-width:700px')
    return (
        <Stack flexDirection={'coulmn'}
        alignItems={'center'}>
        <Stack flexDirection={'column'}
        width={_700 ? '800px' : '90%' || _660 ? '600px' : '50%' }
        mx={'auto'}
        p={2}
        m={2}
        gap={2}
        
        >
            <Stack flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            >
            <Stack flexDirection={'column'} gap={2}>
            <Typography variant='h2' fontWeight={'bold'} fontSize={_660 ? '2rem':'1rem'}>Aman Sharma</Typography>

            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography variant='h2' fontSize={_300 ? '1rem':'.8rem'}>Aman Sharma</Typography>

            <Chip 
            label='aman'
            size="small"
            sx={{
                fontSize:_300 ? '.8rem' : '.6rem'
            }} 
            />

            </Stack>
            
            </Stack>

            <Avatar src="" alt=""
            sx={{
                width:_300 ? '60' : '40', height: _300 ? '60' : '40'
            }} />
  
        </Stack>
            <Typography variant='subtitle2'>This is a bio</Typography>
            <Stack flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            >
            <Typography variant='subtitle2' color='grey'>19000 followers</Typography>
            <FaInstagram size={_300 ? '35' : "24"} />
            </Stack>
        </Stack>

            <Button size='large'
            sx={{
                color: 'black', width:'800px', mx:'auto', textAlign:'center', border: '1px solid gray',
                borderRadius:'15px'
            }}
            >Edit profile</Button>

        <Stack flexDirection={'row'}
        justifyContent={'space-evenly'} my={5} pb={2}
        borderBottom={'2px solid grey'} fontSize={_660 ?'1.2rem' : _300 ? '1rem' : '0.9rem'}
        width={_700 ? '800px' : '90%'} mx={'auto'} color={'grey'}
        > 
        <Link to={'/profile/threads/1'}>Threads</Link>
        <Link to={'/profile/replies/1'}>Replies</Link>
        <Link to={'/profile/reposts/1'}>Reposts</Link>
        </Stack>
        <Outlet />
        </Stack>
    )
}

export default ProfileLayout
  