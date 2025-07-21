import React from 'react'
import { Stack, Typography, Chip, Avatar, Button } from '@mui/material'
import { FaInstagram } from "react-icons/fa6";


function ProfileLayout() {
    return (
        <div>
        <Stack flexDirection={'column'}
        width={'800px'}
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
            <Typography variant='h2' fontWeight={'bold'} fontSize={'2rem'}>Aman Sharma</Typography>

            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography variant='h2' fontSize={'1rem'}>Aman Sharma</Typography>

            <Chip 
            Label="threads.net"
            size="small"
            sx={{
                fontSize:'.8rem'
            }} 
            />

            </Stack>
            
            </Stack>

            <Avatar src="" alt=""
            sx={{
                width:60, height:60
            }} />
  
        </Stack>
            <Typography variant='subtitle2'>This is a bio</Typography>
            <Stack flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            >
            <Typography variant='subtitle2' color='grey'>19000 followers</Typography>
            <FaInstagram size={35} />
            </Stack>
        </Stack>

            <Button size='large'
            sx={{
                color: 'black', width:'800px', mx:'auto', textAlign:'center', border: '1px solid gray',
                
            }}
            >Edit profile</Button>

            <h1>2:37</h1>
        </div>
    )
}

export default ProfileLayout
